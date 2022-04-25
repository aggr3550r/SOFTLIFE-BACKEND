import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateBlogPostDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}