import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('defaultBearerAuth')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(@Request() req) {
		return this.usersService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() newUserData: UpdateUserInput,
	) {
		return this.usersService.updateUser(id, newUserData);
	}

	@Patch(':id/change-password')
	async changePassword(
		@Param('id') id: string,
		@Body() changePassword: ChangePasswordInput,
	) {
		const user = await this.usersService.findOne(id);
		return this.usersService.changePassword(id, user.password, changePassword);
	}
}
