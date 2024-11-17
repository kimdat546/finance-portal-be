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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { UploadTransactionsDto } from './dto/upload-transactions.dto';

@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('defaultBearerAuth')
@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) { }

	@Post()
	create(@Body() createTransactionDto: CreateTransactionDto) {
		return this.transactionsService.create(createTransactionDto);
	}

	@Get()
	findAll() {
		return this.transactionsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.transactionsService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: Partial<CreateTransactionDto>,
	) {
		return this.transactionsService.update(id, updateTransactionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.transactionsService.remove(id);
	}

	@Post('upload')
	uploadTransactions(
		@Body() uploadTransactionsDto: UploadTransactionsDto,
		@Req() req,
	) {
		const userId = req.user.id;
		return this.transactionsService.uploadTransactions(uploadTransactionsDto, userId);
	}
}
