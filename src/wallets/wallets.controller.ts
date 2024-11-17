import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@ApiTags('Wallets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('defaultBearerAuth')
@Controller('wallets')
export class WalletsController {
	constructor(private readonly walletsService: WalletsService) { }

	@Post()
	create(@Body() createWalletDto: CreateWalletDto) {
		return this.walletsService.create(createWalletDto);
	}

	@Get()
	findAll() {
		return this.walletsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.walletsService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateWalletDto: Partial<CreateWalletDto>,
	) {
		return this.walletsService.update(id, updateWalletDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.walletsService.remove(id);
	}
}
