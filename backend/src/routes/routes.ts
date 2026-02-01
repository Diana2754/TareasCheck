import { Router } from 'express';
import {
  getTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from '../controllers/controller';

const router = Router();

router.get('/tasks', getTareas);
router.post('/tasks', crearTarea);
router.put('/tasks/:id', actualizarTarea);
router.delete('/tasks/:id',eliminarTarea);

export default router;
