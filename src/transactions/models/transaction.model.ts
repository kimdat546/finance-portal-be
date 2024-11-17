import { Field, Float, ObjectType } from '@nestjs/graphql';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Transaction extends BaseModel {
	@Field()
	@IsString()
	userId: string;

	@Field()
	@IsString()
	walletId: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	categoryId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	debtId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	savingsPlanId?: string;

	@Field(() => Float)
	@IsNumber()
	amount: number;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	description?: string;

	@Field(() => TransactionType)
	@IsEnum(TransactionType)
	transactionType: TransactionType;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	recipientAccount?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	refNumber?: string;
}
