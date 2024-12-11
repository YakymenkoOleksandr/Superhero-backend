import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createSuperheroSchema } from '../validation/superheros.js';
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

const router = Router();

router.get('/', ctrlWrapper(getSuperherosController));

router.get('/superheros', ctrlWrapper(getSuperherosController));

router.get('/superheros/:superheroId', ctrlWrapper(getSuperheroByIdController));

router.post(
  '/superheros',
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
