// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
	CreateCategoryDto,
	CreateMultipleCategoriesDto,
} from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
	constructor(private prisma: PrismaService) { }

	async create(createCategoryDto: CreateCategoryDto, userId: string) {
		return this.prisma.category.create({
			data: {
				name: createCategoryDto.name,
				icon: createCategoryDto?.icon || null,
				parentId: createCategoryDto?.parentId || null,
				userId,
			},
		});
	}

	async createMultiple(
		createMultipleCategoriesDto: CreateMultipleCategoriesDto,
		userId: string,
	) {
		const { categories } = createMultipleCategoriesDto;
		return this.prisma.$transaction(
			categories.map(category =>
				this.prisma.category.create({
					data: {
						name: category.name,
						icon: category?.icon || null,
						parentId: category?.parentId || null,
						userId,
					},
				}),
			),
		);
	}

	async findAll() {
		return this.prisma.category.findMany();
	}

	async findOne(id: string) {
		return this.prisma.category.findUnique({
			where: { id },
		});
	}

	async update(id: string, updateCategoryDto: Partial<CreateCategoryDto>) {
		return this.prisma.category.update({
			where: { id },
			data: updateCategoryDto,
		});
	}

	async remove(id: string) {
		return this.prisma.category.delete({
			where: { id },
		});
	}
}
