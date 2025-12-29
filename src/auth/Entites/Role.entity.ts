import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Permission } from './Permission.entity';
import { User } from "./User.entity";



@Entity()
export  class Role {

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @ManyToMany(()=> Permission)
    @JoinTable()
    permessions : Permission [];

    @OneToMany(()=>User, (users)=>users.role)
    users : User
}