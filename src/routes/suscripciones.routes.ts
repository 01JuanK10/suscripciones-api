import { Router } from 'express';
import { desuscribirse, suscribirse, getSuscripcionesByClienteId } from '../controllers/suscripcion.controller';

const router = Router();

router.post('/suscribirse', suscribirse);
router.post('/desuscribirse', desuscribirse);
router.get('/getByCliente/:id', getSuscripcionesByClienteId);


export default router;