import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(err = 'Validation fails.') {
    super(err, 'application/validations-fail');
  }
}
