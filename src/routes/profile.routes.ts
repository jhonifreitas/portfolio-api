import { Router } from 'express';

import ProfileController from '@controllers/profile.controller';

const router = Router();

router.get('/', ProfileController.getAll);
router.get('/:id', ProfileController.get);

router.post('/', ProfileController.add);
router.put('/:id', ProfileController.update);
router.delete('/:id', ProfileController.delete);
router.patch('/:id/active', ProfileController.active);

export default router;
