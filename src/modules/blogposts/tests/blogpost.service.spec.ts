import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostService } from './blogpost.service';

describe('BlogService', () => {
  let service: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService],
    }).compile();

    service = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
