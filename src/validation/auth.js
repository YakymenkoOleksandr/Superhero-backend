import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .pattern(new RegExp(".*[a-z].*"), "lowercase")
  .pattern(new RegExp(".*[A-Z].*"), "uppercase")
  .pattern(new RegExp(".*\\d.*"), "number")
  .pattern(
    new RegExp('[!@#$%^&*(),.?":{}|<>]'),
    "special character"
  )
  .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp(".*[a-z].*"), "lowercase")
    .pattern(new RegExp(".*[A-Z].*"), "uppercase")
    .pattern(new RegExp(".*\\d.*"), "number")
    .pattern(
      new RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "special character"
    )
    .required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
