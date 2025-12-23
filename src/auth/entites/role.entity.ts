import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permession } from './permession.entity';


@Entity()
export  class Role {

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @ManyToMany(()=> Permession)
    @JoinTable()
    permessions : Permession [];
}