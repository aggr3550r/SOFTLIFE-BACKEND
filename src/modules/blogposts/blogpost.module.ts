import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostController } from './blogpost.controller';
import { BlogPostService } from './blogpost.service';
import { BlogPost } from './entities/blogpost.entity';
import { BlogPostRepository } from './repository/blogpost.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost ,BlogPostRepository])],
  exports: [TypeOrmModule.forFeature([BlogPostRepository])],
  controllers: [BlogPostController],
  providers: [BlogPostService]
})
export class BlogPostModule {}