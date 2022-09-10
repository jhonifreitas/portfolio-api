import { Router } from 'express';

import { upload } from '@middlewares/upload-file';
import ServiceController from '@controllers/service.controller';

const router = Router();

router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.get);

router.post('/', upload.any(), ServiceController.add);
router.put('/:id', upload.any(), ServiceController.update);

router.delete('/:id', ServiceController.delete);
router.patch('/:id/active', ServiceController.active);

export default router;
