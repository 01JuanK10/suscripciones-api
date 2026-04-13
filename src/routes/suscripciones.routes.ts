import { Router } from 'express';
import { desuscribirse, suscribirse } from '../controllers/suscripcion.controller';

const router = Router();

router.post('/suscripcion/', suscribirse);
router.post('/suscripcion/', desuscribirse);


export default router;