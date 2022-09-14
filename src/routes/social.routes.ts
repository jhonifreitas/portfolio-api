import { Router } from 'express';

import { ensureAuth } from '@middlewares/ensure-auth';
import SocialController from '@controllers/social.controller';

const router = Router();

router.get('/', SocialController.getAll);
router.get('/:id', SocialController.get);

router.use(ensureAuth());

router.post('/', SocialController.add);
router.put('/:id', SocialController.update);

router.delete('/:id', SocialController.delete);
router.patch('/:id/active', SocialController.active);

export default router;
