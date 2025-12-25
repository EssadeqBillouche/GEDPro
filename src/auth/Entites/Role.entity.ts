import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Permession } from './Permession.entity';
import { User } from "./User.entity";



@Entity()
export  class Role {

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @ManyToMany(()=> Permession)
    @JoinTable()
    permessions : Permession [];

    @OneToMany(()=>User, (users)=>users.role)
    users : User
}