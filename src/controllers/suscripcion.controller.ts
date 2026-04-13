import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Clientes } from '../models/cliente.model';
import { ClienteFondos } from '../models/clienteFondo.model';
import { Fondos } from '../models/fondos.model';
import { Transaccion } from '../models/transaccion.model';
import tr from 'zod/v4/locales/tr.js';

const repoClientes = AppDataSource.getRepository(Clientes);
const repoSuscripcion = AppDataSource.getRepository(ClienteFondos);
const repoFondos = AppDataSource.getRepository(Fondos);

export const getAll = async (req: Request, res: Response) => {
  // Implement your logic here
  console.log("no implementaod")
};

export const suscribirse = async (req: Request, res: Response) => {
    try {
        
      const cliente = await repoClientes.findOneBy({id: Number.parseInt(req.body.clienteId)});
      const fondo = await repoFondos.findOneBy({id: Number.parseInt(req.body.fondoId)});

      if(cliente && fondo){
        let suscripcion = new ClienteFondos();

        cliente.saldo = cliente.saldo - fondo.montoMin;
        suscripcion.cliente = cliente;
        suscripcion.fondos = fondo;
        const clienteSaved = await repoClientes.save(cliente);

        suscripcion.cliente = clienteSaved;
        const suscripcionSaved = await repoSuscripcion.save(suscripcion);
        res.status(201).json(suscripcionSaved)
      }else{
        res.status(404).json({"message": "cliente o fondo no encontrado"});
        return;
      }
        cliente.id = req.body.id;
    } catch (error) {
        res.status(500).json({'code': 500, 'error': "error insertando registro"})
    }
}

export const desuscribirse = async (req: Request, res: Response) => {
    try {
        
      const cliente = await repoClientes.findOneBy({id: Number.parseInt(req.body.clienteId)});
      const fondo = await repoFondos.findOneBy({id: Number.parseInt(req.body.fondoId)});

      if(cliente && fondo){
        let suscripcion = new ClienteFondos();

        cliente.saldo = cliente.saldo - fondo.montoMin;
        suscripcion.cliente = cliente;
        suscripcion.fondos = fondo;
        const clienteSaved = await repoClientes.save(cliente);

        suscripcion.cliente = clienteSaved;
        const suscripcionSaved = await repoSuscripcion.save(suscripcion);
        res.status(201).json(suscripcionSaved)

        let transaccion = new Transaccion();
        transaccion.fecha = new Date().toISOString();
        transaccion.tipo = true;
        transaccion.clienteFondos = [suscripcionSaved];


      }else{
        res.status(404).json({"message": "cliente o fondo no encontrado"});
        return;
      }
        cliente.id = req.body.id;
    } catch (error) {
        res.status(500).json({'code': 500, 'error': "error insertando registro"})
    }
}