import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ScheduleModule } from 'nest-schedule';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [ConfigModule, ScheduleModule, PrismaModule, ProductsModule, EventEmitterModule.forRoot()],
  exports: [StripeService]
})
export class StripeModule {}
