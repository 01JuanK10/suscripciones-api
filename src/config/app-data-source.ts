import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.MARIADB_HOST || "localhost",
    port: Number(process.env.MARIADB_PORT) || 3306,
    username: process.env.MARIADB_USER || "test",
    password: process.env.MARIADB_PASSWORD || "test",
    database: process.env.MARIADB_DATABASE || "test",
})