import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}