import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./categoria.model";
import { ClienteFondos } from "./clienteFondo.model";

@Entity()
export class Fondos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    montoMin: number;

    @ManyToOne( () => Categoria, (categoria) => {categoria.fondos} )
    categoria: Categoria;

    @OneToMany( () => ClienteFondos, (clienteFondos) =>{ clienteFondos.fondos})
    clienteFondos: ClienteFondos[];

}