"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidatorImpl = void 0;
const passwordValidator = require('password-validator');
class PasswordValidatorImpl {
    schema;
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
    validatePassword(password) {
        let isValidPassword = this.schema.validate(password);
        return isValidPassword;
    }
}
exports.PasswordValidatorImpl = PasswordValidatorImpl;
//# sourceMappingURL=PasswordValidatorHelper.js.map