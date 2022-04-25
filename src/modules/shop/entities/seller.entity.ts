import { BaseModel } from "src/base.model";
import { Column, Entity } from "typeorm";

@Entity()
export class Seller extends BaseModel {
    @Column({default: "false"})
    seller: boolean;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zip: number;
}
