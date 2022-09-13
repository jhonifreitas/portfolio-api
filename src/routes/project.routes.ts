import { Router } from 'express';

import ProjectController from '@controllers/project.controller';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.get);

router.post('/', ProjectController.add);
router.put('/:id', ProjectController.update);

router.delete('/:id', ProjectController.delete);
router.patch('/:id/active', ProjectController.active);

export default router;
