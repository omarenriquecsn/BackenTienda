import { Request, Response, NextFunction } from 'express';

export const LoggerModule = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fecha = new Date().toLocaleString();
  console.log(
    'ruta:',
    req.originalUrl,
    'metodo:',
    req.method,
    'fecha y hora:',
    fecha,
  );
  next();
};
