/**
 * Created by roexber on 1/07/14.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('./logger'),
    compression = require('compression'),
    errorHandler = require('./errorHandler'),
    validator = require('./validator'),
    cors = require('cors');

require('./db');

exports.app = app = express();

app.use(cors()); // Cross Origin Resource Sharing

app.set('case sensitive routing', true);

// Gzip JSON responses - why 150? https://developers.google.com/speed/docs/best-practices/payload#GzipCompression
app.use(compression({threshold: 150}));

// parse application/json
app.use(bodyParser.json());

app.get('/health', function (req, res) {
    res.statusCode = 200;
    res.end();
});

// Profile all requests
app.use(function(req, res, next) {
    logger.profile(req._parsedUrl.pathname);
    next();

    res.on('finish', function() {
        logger.profile(req._parsedUrl.pathname);
    });
});

require("./routes");

// This MUST be after the routes definitions!
app.use(function(err, req, res, next) {
    if (err) {
        var errorPayload = { "body": [] };

        if (err instanceof validator.ValidationException) {
            errorPayload.statusCode = 400;
            err.validationErrors.forEach(function (validationError) {
                errorPayload.body.push({ "field": validationError.field, "key": validationError.key, "message": validationError.message, "source": "node.api" });
            });
        } else if (err instanceof errorHandler.ServiceException) {
            errorPayload.body.push({ "key": err.key, "message": err.message, "source": "node.api" });
        } else if (err instanceof errorHandler.AuthorizationException) {
            errorPayload.statusCode = 401;
            errorPayload.body.push({ "key": err.key, "message": err.message, "source": "node.api" });
        } else if (err instanceof errorHandler.ForbiddenException) {
            errorPayload.statusCode = 403;
            errorPayload.body.push({ "key": err.key, "message": err.message, "source": "node.api" });
        } else {
            errorPayload.body.push({"source": "node.api"});
        }

        errorHandler.handleResponseError(errorPayload, res);
    } else {
        next();
    }
});