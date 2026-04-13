import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Clientes } from '../models/cliente.model';


const repo = AppDataSource.getRepository(Clientes);
export const getAllClientes = async (req: Request, res: Response) => {
  try {
    let clientes: Clientes[];
    if(req.query.asc === "true"){
        clientes = await repo.find({
            order: {
                id: "ASC",
            },
            take: Number.parseInt(req.query.cant as string),
            skip: Number.parseInt(req.query.cant as string) * Number.parseInt(req.query.page as string)
        });
    }else{
        clientes = await repo.find({
            order: {
                id: "DESC",
            },
            take: Number.parseInt(req.query.cant as string),
            skip: Number.parseInt(req.query.cant as string) * Number.parseInt(req.query.page as string)
        });
    }
    
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({'code': 500, 'error': "ocurrio un error interno"})
  }
};

export const getClienteById = async (req: Request, res: Response) => {
    try {
        const cliente = await repo.findOneBy(
                {
                    id: Number.parseInt(req.params.id as string)
                });

        if(cliente){
            res.status(200).json(cliente);
        }else{
            res.status(404).json({"message": "cliente no encontrado"});
        }
    } catch (error) {
        res.status(500).json({'code': 500, 'error': "ocurrio un error interno"})
    }
}

export const createCliente = async (req: Request, res: Response) => {
    try {
        
        let cliente: Clientes = new Clientes();
        cliente.id = req.body.id;
        cliente.nombre = (req.body.nombre as string).toLowerCase();
        cliente.email = (req.body.email as string).toLowerCase();
        cliente.telefono = req.body.telefono;
        cliente.saldo = 500000;
        const clienteSaved = await repo.save(cliente);
        res.status(201).json(clienteSaved)

    } catch (error) {
        res.status(500).json({'code': 500, 'error': "error insertando registro"})
    }
}