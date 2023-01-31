import { Test, TestingModule } from '@nestjs/testing';
import { UsersMetaController } from './users-meta.controller';
import { UsersMetaService } from './users-meta.service';

describe('UsersMetaController', () => {
  let controller: UsersMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMetaController],
      providers: [UsersMetaService],
    }).compile();

    controller = module.get<UsersMetaController>(UsersMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
