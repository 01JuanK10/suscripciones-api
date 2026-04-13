import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClienteFondos } from "./clienteFondo.model";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    montoMin: number;

    @OneToMany( () => ClienteFondos, (clienteFondos) => {clienteFondos.cliente})
    clienteFondos: ClienteFondos[];

}