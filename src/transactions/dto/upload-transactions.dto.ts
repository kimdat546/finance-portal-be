import {
	IsString,
	IsEnum,
	IsNumber,
	IsDateString,
	IsArray,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

class TransactionDto {
	@IsDateString()
	@ApiProperty({ example: '2020-03-07T00:00:00.000Z' })
	date: string;

	@IsString()
	@ApiProperty({ example: '370CHDP200670012' })
	refNumber: string;

	@IsNumber()
	@ApiProperty({ example: 4200000 })
	amount: number;

	@IsString()
	@ApiProperty({ example: 'NGUYEN KIM DAT NT' })
	description: string;

	@IsEnum(TransactionType)
	@ApiProperty({ example: TransactionType.EXPENSE, enum: TransactionType })
	transactionType: TransactionType;

	@IsNumber()
	@ApiProperty({ example: 0 })
	balance: number;

	@IsString()
	@ApiProperty({ example: '751c2535-d607-49ed-a74a-b4783e1805bd' })
	walletId: string;
}

export class UploadTransactionsDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => TransactionDto)
	@ApiProperty({ type: [TransactionDto] })
	transactions: TransactionDto[];
}
