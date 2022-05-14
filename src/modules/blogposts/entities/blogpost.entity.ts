import { BaseModel } from 'src/models/base.model';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class BlogPost extends BaseModel {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: ' ' })
  content: string;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.blogposts)
  creator: User;
}
