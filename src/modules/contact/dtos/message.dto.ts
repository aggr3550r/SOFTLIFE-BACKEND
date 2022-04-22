import { Expose } from "class-transformer";

export class MessageDTO {
    @Expose()
    id: number;
    
    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    message: string;

    @Expose()
    replied: boolean;
}