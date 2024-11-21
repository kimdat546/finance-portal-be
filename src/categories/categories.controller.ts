import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import {
	CreateCategoryDto,
	CreateMultipleCategoriesDto,
} from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('defaultBearerAuth')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) { }

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
		return this.categoriesService.create(createCategoryDto, req.user.id);
	}

	@Post('bulk')
	createMultiple(
		@Body() createMultipleCategoriesDto: CreateMultipleCategoriesDto,
		@Req() req,
	) {
		return this.categoriesService.createMultiple(
			createMultipleCategoriesDto,
			req.user.id,
		);
	}

	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: Partial<CreateCategoryDto>,
	) {
		return this.categoriesService.update(id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(id);
	}
}
