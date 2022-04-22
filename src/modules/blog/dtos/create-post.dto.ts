import { IsNotEmpty, IsOptional, IsString, Max } from "class-validator";


export class CreatePostDTO {
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