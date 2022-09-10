import { Router } from 'express';

import { upload } from '@middlewares/upload-file';
import ProfileController from '@controllers/profile.controller';

const router = Router();

router.get('/', ProfileController.getAll);
router.get('/:id', ProfileController.get);

router.post('/', upload.any(), ProfileController.add);
router.put('/:id', upload.any(), ProfileController.update);

router.delete('/:id', ProfileController.delete);
router.patch('/:id/active', ProfileController.active);

export default router;
