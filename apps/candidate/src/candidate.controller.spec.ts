import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';

describe('CandidateController', () => {
  let candidateController: CandidateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [CandidateService],
    }).compile();

    candidateController = app.get<CandidateController>(CandidateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(candidateController.getHello()).toBe('Hello World!');
    });
  });
});
