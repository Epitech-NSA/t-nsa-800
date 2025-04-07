import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../config/data-source';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = res.locals.jwtPayload?.userId;

    if (!id) {
      res.status(401).send('Missing user ID in token');
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneOrFail({ where: { id } });

      if (!roles.includes(user.role)) {
        res.status(403).send('Insufficient permissions');
        return;
      }

      next();
    } catch (error) {
      res.status(401).send('User not found');
    }
  };
};
