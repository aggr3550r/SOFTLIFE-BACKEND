import { IsBoolean } from 'class-validator';

export class ApprovePostDTO {
    @IsBoolean()
    approved: boolean;
}