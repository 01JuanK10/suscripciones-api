import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Fondos } from "./fondos.model";
import { Clientes } from "./cliente.model";
import{ Transaccion } from "./transaccion.model";

@Entity()
export class ClienteFondos {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Fondos, (fondos) =>{ fondos.clienteFondos})
    fondos: Fondos;

    @ManyToOne( () => Clientes, (clientes) =>{ clientes.clienteFondos })
    cliente: Clientes;

    @OneToMany( () => Transaccion, (transaccion) =>{ transaccion.clienteFondos })
    transacciones: Transaccion[];

}