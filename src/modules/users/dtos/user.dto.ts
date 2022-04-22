import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    id: number;
     
    @Expose()
    username: string;

    @Expose()
    email: string;
}