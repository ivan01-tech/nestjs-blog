import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
class ArticleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'string', length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column()
  @ManyToOne(() => UserEntity, (author) => author.articles)
  author: UserEntity;
}

export default ArticleEntity;
