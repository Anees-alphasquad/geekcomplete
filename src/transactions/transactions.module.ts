import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StripeModule } from 'src/stripe/stripe.module';


@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [PrismaModule, UsersModule, ProductsModule, ScheduleModule.forRoot(), StripeModule],
  exports: [TransactionsService]
})
export class TransactionsModule {}
