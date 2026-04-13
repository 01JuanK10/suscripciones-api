import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Fondos } from "./fondos.model";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany( () => Fondos, (fondos) =>{ fondos.categoria})
    fondos: Fondos[];
}