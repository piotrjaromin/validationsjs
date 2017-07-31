'use strict';

//container is object with error codes as fields, and messages as values
function getMessage(container) {

    //wil either return msgKey if container did not contains message
    //or message formated with args
    //args order must match %s in messages
    return (msgKey, ...args) => {
        let msg = container[msgKey] || msgKey;
        //if additional arguments were passed and valid message exists
        if ( args && msgKey != msg) {
            //replace %s place holders with values passed in args
            args.forEach( arg => msg = msg.replace("%s", arg));
        }
        return msg;
    };
}

module.exports = getMessage;