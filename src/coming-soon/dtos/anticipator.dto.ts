import { Expose } from "class-transformer";

export class AnticipatorDTO {
    @Expose()
    email: string;
}