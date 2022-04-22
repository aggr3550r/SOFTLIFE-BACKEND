import { IsString, IsOptional, IsEmail } from "class-validator";

export class CreateMessageDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    message: string;
}