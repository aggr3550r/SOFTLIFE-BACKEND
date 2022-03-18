import { IsNotEmpty, IsOptional, IsString, Max } from "class-validator";


export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    @Max(250)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}