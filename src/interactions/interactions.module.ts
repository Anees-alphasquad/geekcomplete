import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService],
  imports: [PrismaModule],
  exports: [InteractionsService]
})
export class InteractionsModule {}
