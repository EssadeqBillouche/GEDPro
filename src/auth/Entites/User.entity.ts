import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { Role } from "./Role.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ unique : true})
    firstName : string;

    @Column({unique : true})
    lastName : string;

    @Column({unique : true})
    email : string;

    @Column({nullable : true})
    password : string;

    @Column({type : 'varchar', nullable: true})
    refresh_Token : string;

    @ManyToOne(()=>Role, (role)=> role.users)
    role : Role;

}