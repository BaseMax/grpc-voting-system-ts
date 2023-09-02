import { Test, TestingModule } from '@nestjs/testing';
import { ElectionService } from './election.service';

describe('ElectionService', () => {
  let service: ElectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionService],
    }).compile();

    service = module.get<ElectionService>(ElectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
