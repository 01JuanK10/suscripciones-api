import { Router } from 'express';
import { createCliente, getAllClientes, getClienteById } from '../controllers/cliente.controller';

const router = Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);

export default router;