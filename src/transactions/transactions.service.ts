import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UploadTransactionsDto } from './dto/upload-transactions.dto';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) { }

	async create(payload: CreateTransactionDto) {
		return this.prisma.transaction.create({
			data: payload,
		});
	}

	async findAll() {
		return this.prisma.transaction.findMany();
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
		console.log('transactions', transactions);
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
		console.log('createdTransactions', createdTransactions);

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
