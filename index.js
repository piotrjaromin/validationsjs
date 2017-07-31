'use strict';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

class FieldValidator {

    constructor(errors, value, fieldName, parentValidator, messages) {
        this.value = value;
        this.errors = errors;
        this.fieldName = fieldName;
        this.parentValidator = parentValidator;
        this.optValue = false;
        this.messages = messages;
    }

    genericCheck(isInvalidFn, msgKey, ...msgArgs) {
        if (this.optValue && this.value.length == 0) {
            return this.parentValidator;
        }

        if ( isInvalidFn() ) {
            this.errors[this.fieldName] = this.messages(msgKey, msgArgs);
        }

        return this.parentValidator;
    }

    notBlank() {
        const isInvalid = () => !this.value || this.value.length == 0;
        return this.genericCheck(isInvalid, "canNotBeEmpty");
    }

    max(maxLen) {
        const isInvalid = () => this.value.length > maxLen;
        return this.genericCheck(isInvalid, "canNotBeLongerThan", maxLen);
    }

    min(minLen) {
        const isInvalid = () => this.value.length < minLen;
        return this.genericCheck(isInvalid, "canNotBeShorterThan", minLen);
    }

    between(minLen, maxLen) {
        const isInvalid = () => this.value.length < minLen || this.value.length > maxLen;
        return this.genericCheck(isInvalid, "lengthMustBeBetween",  minLen, maxLen);
    }


    exact(exactLen) {
        const isInvalid = () => this.value.length != exactLen;
        return this.genericCheck(isInvalid, "lengthMustBeExact",  exactLen);
    }

    email() {
        const isInvalid = () => !EMAIL_REGEXP.test(this.value);
        return this.genericCheck(isInvalid, "invalidEmail");
    }

    minVal(minVal) {
        const isInvalid = () => typeof this.value != "number" || this.value < minVal;
        return this.genericCheck(isInvalid, "canNotBeLessThan", minVal);
    }

    password() {
        const isInvalid = () => {
            let hasNumber = false;
            let hasUpperCase = false;
            let isFiveOrMore = this.value.length >= 5;

            for (let i = 0, len = this.value.length; i < len; i++) {
                const matches = this.value.match(/\d+/g);
                if (matches != null) {
                    hasNumber = true;
                }

                if (/[A-Z]/.test(this.value[i])) {
                    hasUpperCase = true;
                }
            }

            return !( hasNumber && isFiveOrMore && hasUpperCase);
        };

        return this.genericCheck(isInvalid, "invalidPassword");
    }


    optional() {
        this.optValue = true;
        return this;
    }
}


class Validator {

    constructor(object, messages = defaultMessages()) {
        this.errors = {};
        this.object = object;
        this.messages = messages;
    }

    check(fieldName) {
        return new FieldValidator(this.errors, this.object[fieldName] || "", fieldName, this, this.messages);
    }

    custom(fieldName, isValid, msgKey) {
        if (!isValid) {
            this.errors[fieldName] = this.messages(msgKey);
        }
        return this;
    }

    getErrors() {
        return Object.keys(this.errors).length > 0 ? this.errors : false;
    }
}

function defaultMessages() {
    return msgKey => msgKey;
}

module.exports.Validator = Validator;