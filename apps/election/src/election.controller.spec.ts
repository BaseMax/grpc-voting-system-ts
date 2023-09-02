import { Test, TestingModule } from '@nestjs/testing';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';

describe('ElectionController', () => {
  let electionController: ElectionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ElectionController],
      providers: [ElectionService],
    }).compile();

    electionController = app.get<ElectionController>(ElectionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(electionController.getHello()).toBe('Hello World!');
    });
  });
});
