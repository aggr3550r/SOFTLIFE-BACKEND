import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    message: string;

    @CreateDateColumn({
        nullable: false,
        name: "dt_created"
    })
    createdOn: Date;

    @Column({default: false})
    replied: boolean;
}