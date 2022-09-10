import { Router } from 'express';

import { upload } from '@middlewares/upload-file';
import ProjectController from '@controllers/project.controller';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.get);

router.post('/', upload.any(), ProjectController.add);
router.put('/:id', upload.any(), ProjectController.update);

router.delete('/:id', ProjectController.delete);
router.patch('/:id/active', ProjectController.active);

export default router;
