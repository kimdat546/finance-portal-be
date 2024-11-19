import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
}
