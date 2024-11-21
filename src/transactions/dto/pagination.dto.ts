import {
	IsOptional,
	IsString,
	IsInt,
	Min,
	IsArray,
	IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TransactionType } from '@prisma/client';

export class PaginationDto {
	@IsOptional()
	@IsInt()
	@Min(0)
	@Type(() => Number)
	@ApiProperty({ example: 0, required: false })
	page?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Type(() => Number)
	@ApiProperty({ example: 10, required: false })
	pageSize?: number;

	@IsOptional()
	@IsString()
	@ApiProperty({ example: '', required: false })
	search?: string;

	@IsOptional()
	@IsArray()
	@IsEnum(TransactionType, { each: true })
	@ApiProperty({
		example: [TransactionType.EXPENSE],
		enum: TransactionType,
		isArray: true,
		required: false,
	})
	transactionType?: TransactionType[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ApiProperty({ example: ['category-id-1', 'category-id-2'], required: false })
	categoryId?: string[];
}
