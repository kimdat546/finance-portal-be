import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { WalletType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
	@ApiProperty({ example: '00f7a7e7-fe9c-4946-ae57-76a59be8ca18' })
	@IsString()
	userId: string;

	@ApiProperty({ example: 'Default account' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty({ example: 'TP Bank' })
	@IsOptional()
	@IsString()
	bankName?: string;

	@ApiProperty({ example: '064200007400' })
	@IsOptional()
	@IsString()
	accountNumber?: string;

	@ApiProperty({ example: WalletType.BANK, enum: WalletType })
	@IsEnum(WalletType)
	walletType: WalletType;

	@ApiProperty({ example: 0.0 })
	@IsNumber()
	@IsOptional()
	balance?: number;
}
