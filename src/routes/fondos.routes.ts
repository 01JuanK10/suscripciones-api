import {Router} from 'express';
import { getAllFondos } from '../controllers/fondos.controller';

const router = Router();

router.get('/', getAllFondos);

export default router;