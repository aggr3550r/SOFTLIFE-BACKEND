import { Body, Controller, Patch, Post, UseGuards, Param, Get, NotFoundException } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { threadId } from 'worker_threads';
import { ApprovePostDTO } from './dtos/approve-post.dto';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostDTO } from './dtos/post.dto';
import { UpdatePostDTO } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('blogposts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(PostDTO)
    createPost(@Body() body: CreatePostDTO, @CurrentUser() user: User) {
        return this.postsService.create(body, user);
    }

    @Patch('approve/:id')
    @UseGuards(AdminGuard)
    approvePost(@Param('id') id: string, @Body() body: ApprovePostDTO) {
        return this.postsService.changeApprovalStatus(id,body.approved);
    }

    @Get('passers') 
    async getAllApprovedPosts() {
        const posts = await this.getAllPosts();
        const approvedPosts = [];
        posts.forEach((post) => {
            if(post.approved) approvedPosts.push(post)
        })
        return approvedPosts; 
    }


    @Get('/:id')
    async getPost(@Param('id') id: string) {
        const post = await this.postsService.findOne(parseInt(id));
        if(!post) throw new NotFoundException("That blogpost does not exist!");
        return post;
    } 
 
    @Get()
    getAllPosts() {
        return this.postsService.findAll();
    }

    
    @Patch('/:id')
    updatePost(@Param('id') id: string, @Body() body: UpdatePostDTO) {
        return this.postsService.update(parseInt(id), body);
    }
}