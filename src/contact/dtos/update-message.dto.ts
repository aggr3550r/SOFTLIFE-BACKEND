import { IsBoolean } from "class-validator";

export class UpdateMessageDTO {
    @IsBoolean()
    replied: boolean;
}