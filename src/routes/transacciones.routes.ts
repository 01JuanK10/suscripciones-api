import {Router} from 'express';
import { getAllTransacciones, createTransaccion } from '../controllers/transacciones.controller';

const router = Router();

router.get('/', getAllTransacciones);
router.post('/', createTransaccion);

export default router;