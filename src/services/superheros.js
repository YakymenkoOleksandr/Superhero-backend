import { superherosCollection } from '../db/models/superhero.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';


export const getAllSuperheros = async ({ page, perPage }) => {
   const limit = perPage;
  const skip = (page - 1) * perPage;

  const superherosQuery = superherosCollection.find();
  const superherosCount = await superherosCollection.find()
    .merge(superherosQuery)
    .countDocuments();

  const superhero = await superherosQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(superherosCount, perPage, page);

  return {
    data: superhero,
    ...paginationData,
  };
};

export const getSuperheroById = async (superheroId) => {
  const superhero = await superherosCollection.findById(superheroId);
  return superhero;
};

export const createSuperhero = async (payload) => {
  const superhero = await superherosCollection.create(payload);
  return superhero;
};

export const deleteSuperhero = async (superheroId) => {
  const superhero = await superherosCollection.findOneAndDelete({
    _id: superheroId,
  });

  return superhero;
};

export const updateSuperhero = async (superheroId, payload, options = {}) => {
  const rawResult = await superherosCollection.findOneAndUpdate(
    { _id: superheroId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    superhero: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
