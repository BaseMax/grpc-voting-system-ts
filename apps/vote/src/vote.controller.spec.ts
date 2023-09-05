import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

describe('VoteController', () => {
  let voteController: VoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VoteController],
      providers: [VoteService],
    }).compile();

    voteController = app.get<VoteController>(VoteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(voteController.getHello()).toBe('Hello World!');
    });
  });
});
