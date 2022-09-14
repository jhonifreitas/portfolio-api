import { Router } from 'express';

import { ensureAuth } from '@middlewares/ensure-auth';
import ServiceController from '@controllers/service.controller';

const router = Router();

router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.get);

router.use(ensureAuth());

router.post('/', ServiceController.add);
router.put('/:id', ServiceController.update);

router.delete('/:id', ServiceController.delete);
router.patch('/:id/active', ServiceController.active);

export default router;
