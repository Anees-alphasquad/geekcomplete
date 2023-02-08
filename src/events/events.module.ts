import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { StripeModule } from 'nestjs-stripe';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule, ProductsModule, UsersModule, StripeModule]
})
export class EventsModule {}
