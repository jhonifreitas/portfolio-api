import { Router } from 'express';
import { ensureAuth } from '@middlewares/ensure-auth';

import CompanyRoutes from './company.routes';
import ProfileRoutes from './profile.routes';
import ProjectRoutes from './project.routes';
import ServiceRoutes from './service.routes';
import SkillRoutes from './skill.routes';
import SocialRoutes from './social.routes';

const router = Router();

// router.use(ensureAuth());

router.use('/company', CompanyRoutes);
router.use('/profile', ProfileRoutes);
router.use('/project', ProjectRoutes);
router.use('/service', ServiceRoutes);
router.use('/skill', SkillRoutes);
router.use('/social', SocialRoutes);

export default router;
