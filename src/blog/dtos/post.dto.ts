import { Transform, Expose } from "class-transformer";
import { User } from "src/users/entities/user.entity";


export class PostDTO {
    @Expose()
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