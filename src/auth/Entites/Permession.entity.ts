import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Permession{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string
}