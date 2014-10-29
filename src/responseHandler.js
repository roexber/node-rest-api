/**
 * Created by roexber on 29/07/14.
 */
var logger = require('./logger');

var CONTENT_TYPE = "application/json;charset=UTF-8";

exports.handleGetResponse = function (content, response) {
    handleResponse(200, content, response);
};

exports.handleNotFoundResponse = function (response) {
    // TODO
    handleResponse(404, [{
        "message": "The requested resource was not found",
        "key":  "error.node.api.notfound",
        "source": "node.api"
    }], response);
};

var handleResponse = function (status, content, response) {
    response.statusCode = status;
    response.setHeader("Content-Type", CONTENT_TYPE);
    logger.info("Response content:" + JSON.stringify(content));
    response.send(content);
};