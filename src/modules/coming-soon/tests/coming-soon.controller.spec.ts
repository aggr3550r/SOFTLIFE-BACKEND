import { Test, TestingModule } from '@nestjs/testing';
import { ComingSoonController } from './coming-soon.controller';

describe('ComingSoonController', () => {
  let controller: ComingSoonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComingSoonController],
    }).compile();

    controller = module.get<ComingSoonController>(ComingSoonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
