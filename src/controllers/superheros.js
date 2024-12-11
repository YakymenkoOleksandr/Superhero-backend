import {
  getAllSuperheros,
  getSuperheroById,
  createSuperhero,
  deleteSuperhero,
  updateSuperhero,
} from '../services/superheros.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getSuperherosController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const superhero = await getAllSuperheros({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found superhero!',
    data: superhero,
  });
};

export const getSuperheroByIdController = async (req, res, next) => {
  const { superheroId } = req.params;
  const superhero = await getSuperheroById(superheroId);

  if (!superhero) {
    throw createHttpError(404, 'Superhero not found');
  }

  res.json({
    status: 200,
    message: `Successfully found superhero with id ${superheroId}!`,
    data: superhero,
  });
};

export const createSuperheroController = async (req, res) => {
  const superhero = await createSuperhero(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a superhero!`,
    data: superhero,
  });
};

export const deleteSuperheroController = async (req, res, next) => {
  const { superheroId } = req.params;

  const superhero = await deleteSuperhero(superheroId);

  if (!superhero) {
    next(createHttpError(404, 'Superhero not found'));
    return;
  }

  res.status(204).send();
};

export const upsertSuperheroController = async (req, res, next) => {
  const { superheroId } = req.params;

  const result = await updateSuperhero(superheroId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Superhero not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a superhero!`,
    data: result.superhero,
  });
};

export const patchSuperheroController = async (req, res, next) => {
  const { superheroId } = req.params;
  const images = req.file;

  let imageUrl;

  if (images) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      imageUrl = await saveFileToCloudinary(images);
    } else {
      imageUrl = await saveFileToUploadDir(images);
    }
  }

  const result = await updateSuperhero(superheroId, {
    ...req.body,
    images: imageUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Superhero not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a superhero!`,
    data: result.superhero,
  });
};
