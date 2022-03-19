import { Body, Controller, Patch, Post, UseGuards, Param, Get } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
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

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvePost(@Param('id') id: string, @Body() body: ApprovePostDTO) {
        return this.postsService.changeApprovalStatus(id,body.approved);
    }

    @Get('/:id')
    getPost(@Param('id') id: string) {
        return this.postsService.findOne(parseInt(id));
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