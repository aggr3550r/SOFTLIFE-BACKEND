import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { UpdatePostDTO } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './repository/post.repository';


@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostRepository) private postRepository: PostRepository){}

    create(postDto: CreatePostDTO, user: User) {
        const post = this.postRepository.create(postDto);
        post.creator = user;
        return this.postRepository.save(post);
    }

    findOne(id: number) {
        // const post = await this.repo.findOne(id);
        // if(!post) throw new NotFoundException("Post not found!");
        // return post;
        if(!id) return null;
        return this.postRepository.findOne(id);
    }

    async findAll() {
        const posts = await this.postRepository.find();
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
        const post = await this.postRepository.findOne(id);
        if (!post) {
            throw new NotFoundException("Post not found");
        }

        Object.assign(post, body);
        return this.postRepository.save(post); 
    }

    async remove(id: number){
        const post = await this.postRepository.findOne(id);
        if(!post) throw new NotFoundException("User does not exist");
        return this.postRepository.remove(post);
    }

    async changeApprovalStatus(id: string, status: boolean){
        const post = await this.postRepository.findOne(id);
        if(!post){
            throw new NotFoundException("Post does not exist!");
        }
        post.approved = status;
        return this.postRepository.save(post);
    }
}