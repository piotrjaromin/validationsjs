'use strict';

const getMessage = require('./messages');

function messages() {

    const container = {
        canNotBeEmpty : `Pole nie może być puste`,
        canNotBeLongerThan : `Pole nie może mieć więcej niż %s znaków`,
        canNotBeShorterThan : `Pole nie może mieć mniej niż %s znaków`,
        lengthMustBeBetween : `Pole musi mieć pomiędzy %s a %s znaków`,
        lengthMustBeExact : `Pole musi mieć %s znaków`,
        invalidEmail: `Nie poprawny email`,
        canNotBeLessThan: `Pole nie może być liczbą mniejszą od %s`,
        invalidPassword: `Hasło musi mieć co najmniej 5 znaków, jedną dużą literę i jedną cyfrę`
    };

    return getMessage(container);
}

module.exports = messages;