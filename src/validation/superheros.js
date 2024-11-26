import Joi from 'joi';

export const createSuperheroSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Nickname should be a string',
    'string.min': 'Nickname should have at least 3 characters',
    'string.max': 'Nickname should have at most 30 characters',
    'any.required': 'Nickname is required',
  }),
  real_name: Joi.string().min(3).max(30).required(),
  origin_description: Joi.string().min(3).max(1000).required(),
  superpowers: Joi.array().items(Joi.string().min(3).max(100)).required(),
  catch_phrase: Joi.string().min(3).max(50).required(),
  images: Joi.array().items(Joi.string().uri()).required(),
  parentId: Joi.string().required(),
});
