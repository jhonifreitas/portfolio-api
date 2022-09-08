import { Request, Response, NextFunction } from 'express';

import { AppError } from '@exceptions/app-error';

export const errorHandler = (
  err: Error | AppError,
  request: Request,
  response: Response,
  nextFunction: NextFunction // eslint-disable-line
) => {
  if ('statusCode' in err) {
    return response.status(err.statusCode).json({
      code: err.code,
      status: err.statusCode,
      message: err.message
    });
  }

  console.error(JSON.stringify(err));

  return response.status(500).json({
    status: 500,
    message: 'Internal server error.'
  });
};
