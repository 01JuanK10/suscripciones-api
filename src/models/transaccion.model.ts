import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteFondos } from "./clienteFondo.model";

@Entity()
export class Transaccion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @Column()
    tipo: boolean;

    @ManyToOne( () => ClienteFondos, (clienteFondos) =>{ clienteFondos.transacciones })
    clienteFondos: ClienteFondos;

}