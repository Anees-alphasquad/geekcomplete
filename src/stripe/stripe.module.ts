import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [ProductsModule, ConfigModule, UsersModule],
  exports: [StripeService]
})
export class StripeModule {}
