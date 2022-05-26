import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from 'src/dtos/page.dto';
import { PageMetaDTO } from 'src/dtos/pagemeta.dto';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { winstonLogger } from 'src/utils/winston';
import { CreateBlogPostDTO } from './dtos/create-blogpost.dto';
import { UpdatePostDTO } from './dtos/update-blogpost.dto';
import { BlogPost } from './entities/blogpost.entity';
import { BlogPostRepository } from './repository/blogpost.repository';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private blogpostRepository: BlogPostRepository,
  ) {}

  create(blog_post_dto: CreateBlogPostDTO, user: User) {
    const blogpost = this.blogpostRepository.create(blog_post_dto);
    blogpost.creator = user;
    return this.blogpostRepository.save(blogpost);
  }

  async findOne(id: string) {
    if (!id) return null;
    return await this.blogpostRepository.findOne(id);
  }

  async fetchPosts(
    page_options_dto: PageOptionsDTO,
  ): Promise<PageDTO<BlogPost>> {
    try {
      const [items, count] = await this.blogpostRepository.findAndCount({
        order: {
          created_at: 'DESC',
        },
        skip: page_options_dto.skip,
        take: page_options_dto.take,
      });

      const page_meta_dto = new PageMetaDTO({
        total_items: count,
        page_options_dto,
      });

      return new PageDTO(items, page_meta_dto);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async update(id: string, body: UpdatePostDTO) {
    const blogposts = await this.blogpostRepository.findOne(id);
    if (!blogposts) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(blogposts, body);
    return this.blogpostRepository.save(blogposts);
  }

  async remove(id: number) {
    const blogpost = await this.blogpostRepository.findOne(id);
    if (!blogpost) throw new NotFoundException('User does not exist');
    return this.blogpostRepository.remove(blogpost);
  }

  async changeApprovalStatus(id: string, status: boolean) {
    const blogpost = await this.blogpostRepository.findOne(id);
    if (!blogpost) {
      throw new NotFoundException('Post does not exist!');
    }
    blogpost.approved = status;
    return this.blogpostRepository.save(blogpost);
  }
}
