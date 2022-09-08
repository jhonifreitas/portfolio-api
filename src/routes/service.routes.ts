import { Router } from 'express';

import ServiceController from '@controllers/service.controller';

const router = Router();

router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.get);

router.post('/', ServiceController.add);
router.put('/:id', ServiceController.update);
router.delete('/:id', ServiceController.delete);
router.patch('/:id/active', ServiceController.active);

export default router;
