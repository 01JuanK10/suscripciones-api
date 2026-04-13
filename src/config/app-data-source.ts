import { DataSource } from "typeorm";
import { Categoria } from "../models/categoria.model";
import { Fondos } from "../models/fondos.model";
import { Clientes } from "../models/cliente.model";
import { ClienteFondos } from "../models/clienteFondo.model";
import { Transaccion } from "../models/transaccion.model";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.MARIADB_HOST || "localhost",
    port: Number(process.env.MARIADB_PORT) || 3306,
    username: process.env.MARIADB_USER || "test",
    password: process.env.MARIADB_PASSWORD || "test",
    database: process.env.MARIADB_DATABASE || "test",
    entities: [Categoria, Fondos, ClienteFondos, Clientes, Transaccion],
    logging: true,
    synchronize: true,
})