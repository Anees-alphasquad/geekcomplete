import { Test, TestingModule } from '@nestjs/testing';
import { InteractionsMetaService } from './interactions-meta.service';

describe('InteractionsMetaService', () => {
  let service: InteractionsMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractionsMetaService],
    }).compile();

    service = module.get<InteractionsMetaService>(InteractionsMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
