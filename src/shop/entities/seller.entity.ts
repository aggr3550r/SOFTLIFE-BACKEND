import { User } from "src/users/entities/user.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Seller extends User {
    @Column({default: false})
    seller: boolean;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zip: number;
    
    @Column({default: Date.now})
    created: Date;
}
