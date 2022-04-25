import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { ApproveBlogPostDTO } from './dtos/approve-blogpost.dto';
import { CreateBlogPostDTO } from './dtos/create-blogpost.dto';
import { BlogPostDTO } from './dtos/blogpost.dto';
import { UpdatePostDTO } from './dtos/update-blogpost.dto';
import { BlogPostService } from './blogpost.service';

@Controller('blogposts')
export class BlogPostController {
  constructor(private blogPostService: BlogPostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(BlogPostDTO)
  createPost(@Body() body: CreateBlogPostDTO, @CurrentUser() user: User) {
    return this.blogPostService.create(body, user);
  }

  @Patch('approve/:id')
  @UseGuards(AdminGuard)
  approvePost(@Param('id') id: string, @Body() body: ApproveBlogPostDTO) {
    return this.blogPostService.changeApprovalStatus(id, body.approved);
  }

  @Get('passers')
  async getAllApprovedPosts() {
    const blogposts = await this.getAllPosts();
    const approved_posts = [];
    blogposts.forEach((blogpost) => {
      if (blogpost.approved) approved_posts.push(blogpost);
    });
    return approved_posts;
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    const blogpost = await this.blogPostService.findOne(parseInt(id));
    if (!blogpost) throw new NotFoundException('That blogpost does not exist!');
    return blogpost;
  }

  @Get()
  getAllPosts() {
    return this.blogPostService.findAll();
  }

  @Patch('/:id')
  updatePost(@Param('id') id: string, @Body() body: UpdatePostDTO) {
    return this.blogPostService.update(parseInt(id), body);
  }
}
