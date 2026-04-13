import { Request, Response } from "express";
import { AppDataSource } from "../config/app-data-source";
import { Transaccion } from "../models/transaccion.model";

const transaccionRepo = AppDataSource.getRepository(Transaccion);

export const getAllTransacciones = async (req: Request, res: Response) => {
    try {
        let transacciones: Transaccion[] = await transaccionRepo.find();
        res.status(200).json(transacciones);

    } catch (error) {
        res.status(500).json({ 'code': 500, 'error': "Error encontrando las transacciones" });
    }
}

export const createTransaccion = async (req: Request, res: Response) => {
    try{
        let transaccion: Transaccion = new Transaccion();
        transaccion.fecha = new Date().toISOString();
        transaccion.tipo = req.body.tipo;
        const transaccionSaved = await transaccionRepo.save(transaccion);
        res.status(201).json(transaccionSaved);
    }catch(error){
        res.status(500).json({ 'code': 500, 'error': "Error creando la transaccion" });
    }

}