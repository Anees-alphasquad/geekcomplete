import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { InteractionsModule } from './interactions/interactions.module';
import { UsersMetaModule } from './users-meta/users-meta.module';
import { InteractionsMetaModule } from './interactions-meta/interactions-meta.module';
import { ChatsModule } from './chats/chats.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, ProductsModule, InteractionsModule, TransactionsModule, ChatsModule, InteractionsMetaModule, UsersMetaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
