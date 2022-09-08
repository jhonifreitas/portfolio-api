import { Router } from 'express';
import { ensureAuth } from '@middlewares/ensure-auth';

import ProjectRoutes from './project.routes';

const router = Router();

router.use(ensureAuth());

router.use('/project', ProjectRoutes);

export default router;
