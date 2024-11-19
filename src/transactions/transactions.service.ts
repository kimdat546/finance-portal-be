import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UploadTransactionsDto } from './dto/upload-transactions.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) { }

	async create(payload: CreateTransactionDto) {
		return this.prisma.transaction.create({
			data: payload,
		});
	}

	async findAll(paginationDto: PaginationDto) {
		const { page = 0, pageSize = 10, search } = paginationDto;
		const skip = page * pageSize;
		const take = pageSize;

		const where: Prisma.TransactionWhereInput = search
			? {
				OR: [
					{
						description: {
							contains: search,
							mode: Prisma.QueryMode.insensitive,
						},
					},
					{
						refNumber: {
							contains: search,
							mode: Prisma.QueryMode.insensitive,
						},
					},
				],
			}
			: {};

		const [transactions, total] = await this.prisma.$transaction([
			this.prisma.transaction.findMany({
				skip,
				take,
				where,
				include: {
					BalanceHistory: true,
				},
			}),
			this.prisma.transaction.count({ where }),
		]);

		return {
			data: transactions,
			total,
			page,
			pageSize,
		};
	}

	async findOne(id: string) {
		return this.prisma.transaction.findUnique({
			where: { id },
		});
	}

	async update(id: string, payload: Partial<CreateTransactionDto>) {
		return this.prisma.transaction.update({
			where: { id },
			data: payload,
		});
	}

	async remove(id: string) {
		return this.prisma.transaction.delete({
			where: { id },
		});
	}

	async uploadTransactions(
		uploadTransactionsDto: UploadTransactionsDto,
		userId: string,
	) {
		const { transactions } = uploadTransactionsDto;
		const createdTransactions = await this.prisma.$transaction(
			transactions.map(({ walletId, balance, ...transaction }) =>
				this.prisma.transaction.create({
					data: {
						...transaction,
						wallet: { connect: { id: walletId } },
						user: { connect: { id: userId } },
					},
				}),
			),
		);

		await Promise.all(
			createdTransactions.map((transaction, index) =>
				this.updateBalanceHistory(transaction, transactions[index].balance),
			),
		);

		return createdTransactions;
	}

	private async updateBalanceHistory(transaction, balance: number) {
		await this.prisma.balanceHistory.create({
			data: {
				walletId: transaction.walletId,
				transactionId: transaction.id,
				balance: balance,
				date: transaction.date,
			},
		});
	}
}
