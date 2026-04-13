import { Router } from 'express';
import { desuscribirse, suscribirse } from '../controllers/suscripcion.controller';

const router = Router();

router.post('/suscribirse', suscribirse);
router.post('/desuscribirse', desuscribirse);


export default router;