import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsMetaController } from './interactions-meta.controller';
import { InteractionsMetaService } from './interactions-meta.service';

describe('InteractionsMetaController', () => {
  let controller: InteractionsMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractionsMetaController],
      providers: [InteractionsMetaService],
    }).compile();

    controller = module.get<InteractionsMetaController>(InteractionsMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
