import {IsEmail, IsOptional, IsString, IsBoolean} from 'class-validator';

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    
    @IsBoolean()
    @IsOptional()
    admin: boolean;

    @IsBoolean()
    @IsOptional()
    seller: boolean;

    @IsBoolean()
    @IsOptional()
    creator: boolean;
}