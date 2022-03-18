import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false, default: " "})
    content: string;

    @Column({default: false})
    approved: boolean;

    @CreateDateColumn({
        nullable: false,
        name: "dt_created"
    })
    createdOn: Date;

    @UpdateDateColumn({
        nullable: false,
        name: "dt_updated"
    })
    modifiedOn: Date;

    @ManyToOne(() => User, (user) => user.posts)
    creator: User;
}