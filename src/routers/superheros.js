import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createSuperheroSchema } from '../validation/superheros.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getSuperherosController,
  getSuperheroByIdController,
  createSuperheroController,
  deleteSuperheroController,
  upsertSuperheroController,
  patchSuperheroController,
} from '../controllers/superheros.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getSuperherosController));

router.get('/superheros', verifyToken, ctrlWrapper(getSuperherosController));

router.get(
  '/superheros/:superheroId',
  ctrlWrapper(getSuperheroByIdController),
);

router.post(
  '/superheros',
  verifyToken,
  validateBody(createSuperheroSchema),
  upload.single('images'),
  ctrlWrapper(createSuperheroController),
);

router.delete(
  '/superheros/:superheroId',
  ctrlWrapper(deleteSuperheroController),
);

router.put(
  '/superheros/:superheroId',
  validateBody(createSuperheroSchema),
  upload.single('images'),
  ctrlWrapper(upsertSuperheroController),
);

router.patch(
  '/superheros/:superheroId',
  upload.single('images'),
  ctrlWrapper(patchSuperheroController),
);

export default router;
