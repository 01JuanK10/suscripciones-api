import {Request, Response} from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Fondos } from '../models/fondos.model';

const repo = AppDataSource.getRepository(Fondos);

export const getAllFondos = async (req: Request, res: Response) => {
    try {
        let fondos: Fondos[] = await repo.find({relations: ["categoria"]});
        console.log(fondos);
        res.status(200).json(fondos);
    } catch (error) {
        res.status(500).json({ 'code': 500, 'error': "Error encontrando los fondos" });
    }
}
