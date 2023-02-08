import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, StripeModule],
  exports: [UsersService]
})
export class UsersModule {}
