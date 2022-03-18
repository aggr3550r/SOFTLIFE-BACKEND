import { Transform, Expose } from "class-transformer";


export class PostDTO {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    createdOn: Date;

    @Expose()
    approved: boolean;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userID: number;

    @Transform(({obj}) => obj.user.username)
    @Expose()
    username: string;
}