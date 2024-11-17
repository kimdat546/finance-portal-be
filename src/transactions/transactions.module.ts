import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
	imports: [],
	providers: [TransactionsService],
	controllers: [TransactionsController],
})
export class TransactionsModule { }
