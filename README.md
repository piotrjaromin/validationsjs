Simple validations library
==========================

usage
-----

```javascript

//if objToBeValidated contains invalid data then errors will be object with invalid fields and messages, otherwise it will be false boolean value

const errors = new require("validationsjs").Validator(objToBeValidated)
            .check("password").password()
            .check("email").email()
            .check("firstName").min(3)
            .check("lastName").min(3)
            .getErrors();

if ( errors ) {
    console.log("Object had invalid fields. Details: ", JSON.strinigy(errors))
}
```

returnes object might look like this 
```javascript
{
    "password":"invalidPassword",
    "lastName": "canNotBeShorterThan"
}
```

you can provide messages parameter, then error codes will be replaced with proper messages.
If you need other language support just copy content of messages_en.js and provide other values.

```javascript
const messages = require('validationsjs/messages_en');
new require("validationsjs", messages);
```


to run tests
------------
```bash
npm install
./node_modules/mocha/bin/mocha
```

to run eslint
```bash
npm install
./node_modules/eslint/bin/eslint.js .
```
or
```bash
npm install
npm test
```