import { NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const reqData = {
    url: req.url,
    body: req.body,
  };
  console.log(`Request: ${JSON.stringify(reqData)}`);
  next();
}
