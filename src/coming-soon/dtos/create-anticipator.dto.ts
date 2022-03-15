import {IsEmail, IsString} from 'class-validator';

export class CreateAnticipatorDTO {
    @IsEmail()
    email: string;
}