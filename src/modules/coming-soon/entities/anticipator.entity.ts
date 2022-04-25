import { UserBaseModel } from "src/models/user-base.model";
import { Column, Entity } from "typeorm";

@Entity()
export class Anticipator extends UserBaseModel {
    @Column()
    email: string;

    @Column()
    description: string;
}