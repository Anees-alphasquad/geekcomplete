import { Module } from '@nestjs/common';
import { InteractionsMetaService } from './interactions-meta.service';
import { InteractionsMetaController } from './interactions-meta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InteractionsMetaController],
  providers: [InteractionsMetaService],
  imports: [PrismaModule],
  exports: [InteractionsMetaService]
})
export class InteractionsMetaModule {}
