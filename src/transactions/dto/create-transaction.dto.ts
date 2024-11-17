import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
	@IsString()
	@ApiProperty({ example: '00f7a7e7-fe9c-4946-ae57-76a59be8ca18' })
	userId: string;

	@IsString()
	@ApiProperty({ example: '751c2535-d607-49ed-a74a-b4783e1805bd' })
	walletId: string;

	@IsOptional()
	@IsString()
	categoryId?: string;

	@IsOptional()
	@IsString()
	debtId?: string;

	@IsOptional()
	@IsString()
	savingsPlanId?: string;

	@IsNumber()
	@ApiProperty({ example: 100.0 })
	amount: number;

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Transaction description' })
	description?: string;

	@IsEnum(TransactionType)
	@ApiProperty({ example: TransactionType.INCOME, enum: TransactionType })
	transactionType: TransactionType;

	@IsOptional()
	@IsString()
	recipientAccount?: string;

	@IsOptional()
	@IsString()
	refNumber?: string;
}
