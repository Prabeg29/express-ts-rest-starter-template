import { Router } from 'express';

import todoRoute from './todo.route';
import labelRoute from './label.route';

const router: Router = Router();

router.get('/', (_req, res) => res.send('Hello world'));

router.use('/todos', todoRoute);
router.use('/labels', labelRoute);

export default router;
