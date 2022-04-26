import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export class UserDTO {
    @Expose()
    @IsUUID()
    id: number;
     
    @Expose()
    username: string;

    @Expose()
    email: string;
}