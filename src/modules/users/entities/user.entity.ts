import { UserBaseModel } from 'src/models/user-base.model';
import { BlogPost } from 'src/modules/blogposts/entities/blogpost.entity';
import { Cart } from 'src/modules/shop/entities/cart.entity';
import { Image } from 'src/types/image.type';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends UserBaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  profile_picture: Image;

  @Column({ default: false })
  is_seller: boolean;

  @Column({ default: false })
  is_blogger: boolean;

  @OneToMany(() => BlogPost, (blogpost) => blogpost.creator)
  blogposts: BlogPost[];

  @OneToMany(() => Cart, (cart) => cart.owner)
  carts: Cart[];
}
