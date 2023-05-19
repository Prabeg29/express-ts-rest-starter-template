import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { LabelController } from '@modules/labels/label.controller';
import { labelSchema } from '@modules/labels/validations/label.schema';
import { KnexLabelRepository } from '@modules/labels/repositories/knex-label.repository';

const router = Router();
const labelController = new LabelController(new KnexLabelRepository(knex));

router.get('/', tryCatchWrapper(labelController.index));
router.post('/', validate(labelSchema), tryCatchWrapper(labelController.store));

export default router;
