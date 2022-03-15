import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Seller } from "./seller.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
}