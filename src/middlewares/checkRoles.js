import createHttpError from 'http-errors';
import { superherosCollection } from '../db/models/superhero.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { superheroId } = req.params;
      if (!superheroId) {
        next(createHttpError(403));
        return;
      }

      const superhero = await superherosCollection.findOne({
        _id: superheroId,
      });

      if (superhero) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
