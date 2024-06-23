import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { checkRoles } from '../middlewares/checkRoles.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles, ctrlWrapper(getContactsController));

router.get('/:contactId', checkRoles, ctrlWrapper(getContactByIdController));

router.post(
  '',
  checkRoles,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  '/:contactId',
  checkRoles,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

router.delete('/:contactId', checkRoles, ctrlWrapper(deleteContactController));

export default router;
