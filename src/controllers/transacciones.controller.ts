import {Request, Response} from "express";
import {AppDataSource} from "../config/app-data-source";
import {Transaccion} from "../models/transaccion.model";

const studentRepo = AppDataSource.getRepository(Transaccion);

export const getTransacciones = async (req: Request, res: Response) => {
   try{
    
   }catch(error){

   }
}