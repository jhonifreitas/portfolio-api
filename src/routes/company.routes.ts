import { Router } from 'express';

import { ensureAuth } from '@middlewares/ensure-auth';
import CompanyController from '@controllers/company.controller';

const router = Router();

router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.get);

router.use(ensureAuth());

router.post('/', CompanyController.add);
router.put('/:id', CompanyController.update);

router.delete('/:id', CompanyController.delete);
router.patch('/:id/active', CompanyController.active);

export default router;
