import { Module } from '@nestjs/common';
import { UsersMetaService } from './users-meta.service';
import { UsersMetaController } from './users-meta.controller';

@Module({
  controllers: [UsersMetaController],
  providers: [UsersMetaService]
})
export class UsersMetaModule {}
