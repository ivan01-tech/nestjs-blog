import ArticleEntity from 'src/articles/entity/articles.entity';
import { UserRoles } from './../../utils/userRoles';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username?: string;

  @BeforeInsert()
  emailToLowecase(): void {
    this.email = this.email.toLowerCase();
    this.name = this.name.trim();
    console.log(Object.values(UserRoles));
  }

  @Column({ type: 'string', length: 8 })
  password: string;

  @Column({ unique: true })
  email: string;

  // users roles
  @Column({
    type: 'set',
    enum: UserRoles,
    default: [UserRoles.user],
  })
  roles: UserRoles[];

  @Column()
  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: [ArticleEntity];
}
