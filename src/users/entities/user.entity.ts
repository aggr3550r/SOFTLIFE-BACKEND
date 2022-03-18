import { Post } from "src/blog/entities/post.entity";
import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column()
    username: string;

    @Column({ default: false})
    admin: boolean;

    @Column({ default: false})
    seller: boolean;

    @Column({ default: false})
    creator: boolean;

    @AfterInsert()
    logInsert() {
        console.log("Inserted user with an ID of ", this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log("Updated user with an ID of ", this.id);
    }
    
    @AfterRemove()
    logRemove(){
        console.log("Removed user with an ID of", this.id);
    }

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];
    // @OneToMany(() => Report, (report) => report.user)
    // reports: Report[];
}