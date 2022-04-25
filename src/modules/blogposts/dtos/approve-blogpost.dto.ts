import { IsBoolean } from 'class-validator';

export class ApproveBlogPostDTO {
    @IsBoolean()
    approved: boolean;
}