import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService],
  imports: [PrismaModule, UsersModule, ProductsModule],
  exports: [InteractionsService]
})
export class InteractionsModule {}
