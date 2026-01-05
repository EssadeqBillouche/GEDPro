import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  tenantId: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}