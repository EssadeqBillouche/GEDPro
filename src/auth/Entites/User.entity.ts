import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./Role.entity";
import { Organization } from "./Organization.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({ unique : true})
    email : string;

    @Column({ name: 'password_hash' })
    passwordHash : string;

    @Column({ name: 'refresh_token_hash', nullable : true})
    refreshTokenHash : string;

    @Column({ type : 'timestamp', nullable : true})
    lastLogin : Date;

    @ManyToOne(()=> Organization, (org)=> org.users)
    organization : Organization;

    @ManyToMany(()=> Role, (role)=> role.users)
    @JoinTable()
    roles : Role[];

}