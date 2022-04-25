import { BaseModel } from "./base.model";
import { Column } from "typeorm";

export class UserBaseModel extends BaseModel {
     @Column({default: true})
    active: boolean;
    
    @Column({ default: false})
    admin: boolean;

}