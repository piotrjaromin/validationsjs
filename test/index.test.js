'use strict';

const should = require('should');
const validations = require('../index');

describe('validator should', () => {

    it('return errors for complex invalid objects', () => {

        const obj = {
            password: "",
            email: "invalidmail",
            firstName: "fn",
            lastName: "lastNameWayTooLong"
        };

        const errors = validate(obj);
        should.exist(errors);
        Object.keys(errors).should.deepEqual(["password", "email", "firstName", "lastName"]);
    });

    it('pass for valid objects', () => {
        const obj = {
            password: "1234567aA!",
            email: "test@test.com",
            firstName: "valid",
            lastName: "ln"
        };

        const errors = validate(obj);
        should.exist(errors);
        errors.should.be.false;

    });

    it('fail for invalid custom validator', () => {

        const obj = {field2: ""};
        const errors = new validations.Validator(obj)
            .custom("field2", false, "someErrorMsg")
            .getErrors();

        should.exist(errors);
        should.exist(errors.field2);
        errors.field2.should.equal("someErrorMsg");
    });

    it('pass for invalid custom validator', () => {

        const obj = {field2: ""};
        const errors = new validations.Validator(obj)
            .custom("field2", true, "someErrorMsg")
            .getErrors();

        should.exist(errors);
        errors.should.be.false;
    });

    it('return correct error message', () => {

        const testMsg = "test error message";
        const messages = (msgKey) => {
            msgKey.should.equal("canNotBeShorterThan");
            return testMsg;   
        };

        const errors = new validations.Validator({field: "abc"}, messages)
            .check("field").min(10)
            .getErrors();

        should.exist(errors);
        should.exist(errors.field);
        errors.field.should.equal(testMsg);
    });

    it('allow optional fields', () => {
        const errors = new validations.Validator({})
            .check("field").optional().min(10)
            .getErrors();

        errors.should.be.false();
    });

    it('correctly parse messge', () => {
        const errors = new validations.Validator({}, new require('../messages_en')())
            .check("field").exact(10)
            .getErrors();

        should.exist(errors);
        should.exist(errors.field);
        errors.field.should.equal("Field must have exactly 10 characeters");
    });

    function validate(obj) {
        return new validations.Validator(obj)
            .check("password").password()
            .check("email").email()
            .check("firstName").min(3)
            .check("lastName").max(3)
            .getErrors();
    }
});