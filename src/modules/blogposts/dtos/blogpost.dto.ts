import { Transform, Expose } from "class-transformer";
import { IsUUID } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";


export class BlogPostDTO {
    @Expose()
    @IsUUID()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    content: string;

    @Expose()
    createdOn: Date;

    @Expose()
    approved: boolean;

    @Transform(({obj}) => obj.creator.id)
    @Expose()
    userID: number;

    @Transform(({obj}) => obj.creator.username)
    @Expose()
    username: string;
}