import { auth } from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@exceptions/app-error';

export const ensureAuth = () => async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 'application/token-missing');

  try {
    const userInfo = await auth().verifyIdToken(authHeader);

    response.locals.set('user', userInfo.uid);
  } catch (err) {
    throw new AppError('Invalid token', 'application/invalid-token', 401);
  }

  nextFunction();
};
