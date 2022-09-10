import { auth } from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@exceptions/app-error';

export const ensureAuth = () => async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Authorization is missing', 'application/token-missing');
  const parts = authHeader.split(' ');

  if (parts.length !== 2) throw new AppError('Token malformatted.', 'application/token-malformatted', 406);

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) throw new AppError('Token malformatted.', 'application/token-malformatted', 406);

  try {
    const userInfo = await auth().verifyIdToken(token);

    response.locals.userId = userInfo.uid;
  } catch (err) {
    throw new AppError('Invalid token', 'application/invalid-token', 401);
  }

  nextFunction();
};
