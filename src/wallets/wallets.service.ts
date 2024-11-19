import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletsService {
	constructor(
		private prisma: PrismaService,
	) { }
	async create(payload: CreateWalletDto) {
		return this.prisma.wallet.create({
			data: payload,
		});
	}

	async findAll() {
		return this.prisma.wallet.findMany();
	}

	async findOne(id: string) {
		return this.prisma.wallet.findUnique({ where: { id } });
	}

	async findByUserId(userId: string) {
		return this.prisma.wallet.findMany({ where: { userId } });
	}

	update(id: string, payload: Partial<CreateWalletDto>) {
		return this.prisma.wallet.update({
			where: { id },
			data: payload,
		});
	}

	async remove(id: string) {
		return this.prisma.wallet.delete({
			where: { id },
		});
	}
}
