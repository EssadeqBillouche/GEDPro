import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string; // e.g., 'CV_READ'

  @Column()
  subject: string; // e.g., 'Candidate'
}