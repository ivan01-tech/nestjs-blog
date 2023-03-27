import { UserRoles } from './../../utils/userRoles';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.user,
  })
  roles: UserRoles;
}
