import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Anticipator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
}