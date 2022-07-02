import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDTO } from './create-blogpost.dto';

export class UpdatePostDTO extends PartialType(CreateBlogPostDTO) {}
