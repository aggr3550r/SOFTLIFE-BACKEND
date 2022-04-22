import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { UpdatePostDTO } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';


@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>){}

    create(postDto: CreatePostDTO, user: User) {
        const post = this.repo.create(postDto);
        post.creator = user;
        return this.repo.save(post);
    }

    findOne(id: number) {
        // const post = await this.repo.findOne(id);
        // if(!post) throw new NotFoundException("Post not found!");
        // return post;
        if(!id) return null;
        return this.repo.findOne(id);
    }

    async findAll() {
        const posts = await this.repo.find();
        return posts;
    }

    
    // propertyEvaluator(objects: Post[], property ) {
    //     const passers = [];
    //     objects.forEach((object) => {
    //         if(object[property]) passers.push(object)
    //     })
    //     return passers;
    // }


    async update(id: number, body: UpdatePostDTO){
        const post = await this.repo.findOne(id);
        if (!post) {
            throw new NotFoundException("Post not found");
        }

        Object.assign(post, body);
        return this.repo.save(post); 
    }

    async remove(id: number){
        const post = await this.repo.findOne(id);
        if(!post) throw new NotFoundException("User does not exist");
        return this.repo.remove(post);
    }

    async changeApprovalStatus(id: string, status: boolean){
        const post = await this.repo.findOne(id);
        if(!post){
            throw new NotFoundException("Post does not exist!");
        }
        post.approved = status;
        return this.repo.save(post);
    }
}