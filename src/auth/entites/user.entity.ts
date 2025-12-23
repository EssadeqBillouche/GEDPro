import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./role.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    email : string

    @Column({ unique : true})
    name : string;

    @Column({unique : true})
    lastName : string

    @ManyToMany(()=> Role)
    @JoinTable()
    role : Role [];

}