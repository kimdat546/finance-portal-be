// src/categories/dto/create-category.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	icon?: string;

	@IsOptional()
	@IsString()
	parentId?: string;
}

export class CreateMultipleCategoriesDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateCategoryDto)
	categories: CreateCategoryDto[];
}
