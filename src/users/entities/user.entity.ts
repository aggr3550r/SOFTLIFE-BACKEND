// import { Report } from "src/reports/entities//reports.entity";
import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    description: string;


    @Column()
    password: string;

    @Column({ default: "false"})
    admin: boolean;

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

    
    // @OneToMany(() => Report, (report) => report.user)
    // reports: Report[];
}