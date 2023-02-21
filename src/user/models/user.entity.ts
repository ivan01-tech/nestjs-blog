import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username?: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  emailToLowecase() {
    this.email = this.email.toLowerCase();
    this.name = this.name.trim();
  }
}
