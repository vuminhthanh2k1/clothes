import PasswordValidator from 'password-validator';

const passwordValidator = require('password-validator');


interface PasswordValidatorInterface {
  validatePassword(password: string): boolean;
}

export class PasswordValidatorImpl implements PasswordValidatorInterface {
  schema: PasswordValidator;

  constructor() {
    this.schema = new passwordValidator()
      .is()
      .min(6)
      .is()
      .max(20)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(2);
  }

  validatePassword(password: string): boolean {
    let isValidPassword = this.schema.validate(password) as boolean;

    return isValidPassword;
  }
}
