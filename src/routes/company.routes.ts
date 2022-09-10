import { Router } from 'express';

import { upload } from '@middlewares/upload-file';
import CompanyController from '@controllers/company.controller';

const router = Router();

router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.get);

router.post('/', upload.any(), CompanyController.add);
router.put('/:id', upload.any(), CompanyController.update);

router.delete('/:id', CompanyController.delete);
router.patch('/:id/active', CompanyController.active);

export default router;
