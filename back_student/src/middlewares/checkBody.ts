import { Request, Response, NextFunction } from 'express';

export const validateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = fields.filter((field) => !req.body?.[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        message: `Missing fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    next();
  };
};
