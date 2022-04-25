import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BlogPost } from '../entities/blogpost.entity';

@Injectable()
@EntityRepository(BlogPost)
export class BlogPostRepository extends Repository<BlogPost> {}