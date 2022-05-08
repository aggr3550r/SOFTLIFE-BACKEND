import { BaseModel } from 'src/models/base.model';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Cart extends BaseModel {
  @ManyToOne(() => User, (user) => user.carts)
  owner: User;
}
