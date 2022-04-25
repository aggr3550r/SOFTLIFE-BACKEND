import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateBlogPostDTO } from './dtos/create-blogpost.dto';
import { UpdatePostDTO } from './dtos/update-blogpost.dto';
import { BlogPostRepository } from './repository/blogpost.repository';


@Injectable()
export class BlogPostService {
    constructor(@InjectRepository(BlogPostRepository) private blogpostRepository: BlogPostRepository){}

    create(blogPostDto: CreateBlogPostDTO, user: User) {
        const blogpost = this.blogpostRepository.create(blogPostDto);
        blogpost.creator = user;
        return this.blogpostRepository.save(blogpost);
    }

    findOne(id: number) {
        if(!id) return null;
        return this.blogpostRepository.findOne(id);
    }

    async findAll() {
        const blogposts = await this.blogpostRepository.find();
        return blogposts;
    }

    async update(id: number, body: UpdatePostDTO){
        const blogposts = await this.blogpostRepository.findOne(id);
        if (!blogposts) {
            throw new NotFoundException("Post not found");
        }

        Object.assign(blogposts, body);
        return this.blogpostRepository.save(blogposts); 
    }

    async remove(id: number){
        const blogpost = await this.blogpostRepository.findOne(id);
        if(!blogpost) throw new NotFoundException("User does not exist");
        return this.blogpostRepository.remove(blogpost);
    }

    async changeApprovalStatus(id: string, status: boolean){
        const blogpost = await this.blogpostRepository.findOne(id);
        if(!blogpost){
            throw new NotFoundException("Post does not exist!");
        }
        blogpost.approved = status;
        return this.blogpostRepository.save(blogpost);
    }
}