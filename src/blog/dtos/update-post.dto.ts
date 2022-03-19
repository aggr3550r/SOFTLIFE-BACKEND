import { IsNotEmpty, IsOptional, IsString, Max } from "class-validator";


export class UpdatePostDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @Max(250)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    content: string;
}