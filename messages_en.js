'use strict';

const getMessage = require('./messages');

function messages() {

    const container = {
        canNotBeEmpty : `Field cannot be empty`,
        canNotBeLongerThan : `Field cannot have more than %s characters`,
        canNotBeShorterThan : `Field cannot have less than %s characters`,
        lengthMustBeBetween : `Value of field must have length between %s and %s characters`,
        lengthMustBeExact : `Field must have exactly %s characeters`,
        invalidEmail: `Invalid email format`,
        canNotBeLessThan: `Field must be number with value greater than %s`,
        invalidPassword: `Password must have at least 5 characters, one capital letter, and one digit`
    };

    return getMessage(container);
}

module.exports = messages;