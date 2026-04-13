import {Router} from 'express';
import { getAllTransacciones, createTransaccion, getTransaccionesByFondoId} from '../controllers/transacciones.controller';

const router = Router();

router.get('/', getAllTransacciones);
router.post('/', createTransaccion);
router.get('/getByFondoId/:id', getTransaccionesByFondoId);

export default router;