import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Clientes } from '../models/cliente.model';
import { ClienteFondos } from '../models/clienteFondo.model';
import { Fondos } from '../models/fondos.model';
import { Transaccion } from '../models/transaccion.model';

const repoClientes = AppDataSource.getRepository(Clientes);
const repoSuscripcion = AppDataSource.getRepository(ClienteFondos);
const repoFondos = AppDataSource.getRepository(Fondos);
const repoTransaccion = AppDataSource.getRepository(Transaccion);

export const getAll = async (req: Request, res: Response) => {
  // Implement your logic here
  console.log("no implementaod")
};

export const suscribirse = async (req: Request, res: Response) => {
    try {
      const cliente = await repoClientes.findOneBy({id: Number.parseInt(req.body.cliente.id)});
      const fondo = await repoFondos.findOneBy({id: Number.parseInt(req.body.fondos.id)});

      if(cliente && fondo){

        let suscripcion = new ClienteFondos();

        cliente.saldo = cliente.saldo - fondo.montoMin;
        suscripcion.cliente = cliente;
        suscripcion.fondos = fondo;
        const clienteSaved = await repoClientes.save(cliente);

        suscripcion.cliente = clienteSaved;
        const suscripcionSaved = await repoSuscripcion.save(suscripcion);

        let transaccion = new Transaccion();
        transaccion.fecha = new Date().toISOString();
        transaccion.tipo = true;
        transaccion.clienteFondos = suscripcionSaved;

        await repoTransaccion.save(transaccion);

        (async () => {
          const rawResponse = await fetch('https://sandbox.api.mailtrap.io/api/send/4520242', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 5dde0f945dfa7f4ddf43a94e7a3d1002'
            },
            body: JSON.stringify(
              {
              from: {
                email: "fondos@example.com",
                name: "Confirmación de suscripción a fondos de inversiones JSS"
              },
              to: [
                {
                  email: "ceduardo.eh@gmail.com"
                }
              ],
              subject: "Usted se ha suscrito al fondo de inversión JSS",
              text: "¡Gracias por elegirnos!",
              category: "Integration Test"
            })
          });
          const content = await rawResponse.json();

          console.log(content);
        })();

        (async () => {
          const rawResponse = await fetch('http://sms-manager.cuenti.co/api/send-messages', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer Mnw4ODg1fDkwMTU2MjI3MHwwfGV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9pSXlMVEl3TVRrd01qa3hNREF3T1dKbU56RXhNbVpsTFdZMk1qY3ROR1UwT0MxaVl6UXlMV1V5WWpJM05tRXdOV013TjN3NU1ERTFOakl5TnpBaUxDSnBZWFFpT2pFM016UTFOVFl4T1RNc0ltVjRjQ0k2Ym5Wc2JIMC5yRnpFdVp4T2c2X09nM0I2WGJrai1aSklkdlFmZmh1eDhfS3VoMjRlYUhv',
              'X-Auth-Token-Empresa': '2'
            },
            body: JSON.stringify(
              {
                companyId: "2",
                storageType: "queue",
                message: {
                    type: "2",
                    to: [
                        "573183049356"
                    ],
                    body: "Suscripción a JSS exitosa"
                }
              }
            )
          });
          const content = await rawResponse.json();

          console.log(content);
        })();

        res.status(201).json(suscripcionSaved)
      }else{
        res.status(404).json({"message": "cliente o fondo no encontrado"});
        return;
      }
    } catch (error) {
        res.status(500).json({'code': 500, 'error': "error insertando registro"})
    }
}

export const desuscribirse = async (req: Request, res: Response) => {
    try {
        
      const cliente = await repoClientes.findOneBy({id: Number.parseInt(req.body.cliente.id)});
      const fondo = await repoFondos.findOneBy({id: Number.parseInt(req.body.fondos.id)});

      if(cliente && fondo){
        let suscripcion = new ClienteFondos();

        cliente.saldo = cliente.saldo + fondo.montoMin;
        suscripcion.cliente = cliente;
        suscripcion.fondos = fondo;
        const clienteSaved = await repoClientes.save(cliente);

        suscripcion.cliente = clienteSaved;
        const suscripcionSaved = await repoSuscripcion.save(suscripcion);

        let transaccion = new Transaccion();
        transaccion.fecha = new Date().toISOString();
        transaccion.tipo = false;
        transaccion.clienteFondos = suscripcionSaved;

        await repoTransaccion.save(transaccion);

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

