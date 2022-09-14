import { Router } from 'express';

import { ensureAuth } from '@middlewares/ensure-auth';
import SkillController from '@controllers/skill.controller';

const router = Router();

router.get('/', SkillController.getAll);
router.get('/:id', SkillController.get);

router.use(ensureAuth());

router.post('/', SkillController.add);
router.put('/:id', SkillController.update);

router.delete('/:id', SkillController.delete);
router.patch('/:id/active', SkillController.active);

export default router;
