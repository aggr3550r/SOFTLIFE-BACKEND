import { BaseModel } from "src/models/base.model";
import { Column, Entity} from "typeorm";


@Entity()
export class Message extends BaseModel {
    @Column()
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    message: string;

    @Column({default: false})
    replied: boolean;
}