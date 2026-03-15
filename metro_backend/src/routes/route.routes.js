import { Router } from 'express';
import {
    getRoute
} from '../controllers/route.controllers.js';

const router = Router();

router.get('/', getRoute);

export default router;