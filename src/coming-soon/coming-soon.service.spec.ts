import { Test, TestingModule } from '@nestjs/testing';
import { ComingSoonService } from './coming-soon.service';

describe('ComingSoonService', () => {
  let service: ComingSoonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComingSoonService],
    }).compile();

    service = module.get<ComingSoonService>(ComingSoonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
