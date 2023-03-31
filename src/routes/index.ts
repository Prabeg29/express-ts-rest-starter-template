import { Router } from 'express';

import todoRoute from './todo.route';

const router: Router = Router();

router.get('/', (_req, res) => res.send('Hello world'));

router.use('/todos', todoRoute);

export default router;
