import {IsEmail, IsOptional, IsString, IsBoolean} from 'class-validator';

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    
    @IsBoolean()
    @IsOptional()
    admin: boolean;
}