import { Router } from 'express';

import { ensureAuth } from '@middlewares/ensure-auth';
import ProjectController from '@controllers/project.controller';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.get);

router.use(ensureAuth());

router.post('/', ProjectController.add);
router.put('/:id', ProjectController.update);

router.delete('/:id', ProjectController.delete);
router.patch('/:id/active', ProjectController.active);

export default router;
