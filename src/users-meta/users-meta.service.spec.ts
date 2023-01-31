import { Test, TestingModule } from '@nestjs/testing';
import { UsersMetaService } from './users-meta.service';

describe('UsersMetaService', () => {
  let service: UsersMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMetaService],
    }).compile();

    service = module.get<UsersMetaService>(UsersMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
