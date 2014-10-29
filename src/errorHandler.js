var logger = require('./logger'),
    util   = require('util');

var errorSources =  {
    "nodeApi": "node.api",
    "mongo": "node.api.mongo"
};

exports.ServiceException = function(key, message) {
    this.key = key;
    this.message = message;
};

exports.AuthorizationException = function(key, message) {
    this.key = key;
    this.message = message;
};

exports.ForbiddenException = function(key, message) {
    this.key = key;
    this.message = message;
};

exports.ServiceException.prototype = Object.create(Error.prototype);
exports.AuthorizationException.prototype = Object.create(Error.prototype);
exports.ForbiddenException.prototype = Object.create(Error.prototype);

exports.handleResponseError = function(error, response) {
    if (error) {
        // TODO Should add some more context here to the log...
        logger.error('Error occured while processing the request');

        if(response instanceof Function) {
            response(error);
            return true;
        }

        // Take over the status code from the error object if we have one, else return a generic error (500)
        if (error.statusCode) {
            response.status(error.statusCode);
        } else {
            response.status(500);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Construct the default body. We might be able to copy some fields over from the call that went wrong if we're lucky
        var bodyTemplate = {
            "field": undefined,
            "message": "An unspecified error occured",
            "key":  "error." + errorSources.nodeApi + ".unspecified",
            "source": errorSources.nodeApi
        };

        var bodyErrors = [];

        // If the error originates from the b2bServices app or ourselves, copy the fields
        if (error.body && error.body.length > 0) {
            error.body.forEach(function (errorObj) {
                if (errorObj.source === errorSources.nodeApi || errorObj.source === errorSources.mongo) {
                    var body = util._extend({}, bodyTemplate);

                    if (errorObj.field) { body.field = errorObj.field; }
                    if (errorObj.message) { body.message = errorObj.message; }
                    if (errorObj.key) { body.key = errorObj.key; }
                    if (errorObj.source) { body.source = errorObj.source; }

                    bodyErrors.push(body);
                }

            });
        } else {
            // TODO: if the error comes from another application/service, check if we can add some info?
            // For now, just add the generic error
            bodyErrors.push(bodyTemplate);
        }

        response.send(bodyErrors);
        return true;
    }

    return false;
};


/*
TODO ONCE IMPLEMENTED, REMOVE EXAMPLES

 client.get('', function (err, req, res, serviceOptions) {
 if (errorHandler.handleResponseError(err, resp)) {
 return;
 }

 try {


     How to throw an exception: example :-)

 if (true) {
     throw new errorHandler.ServiceException("foo.bar", "Foo = bar");
 }

 } catch (e) {
 next(e);
 }
 });
 */