/**
 * Created by roexber on 30/06/14.
 */
var swagger = require('swagger-node-express'),
    modelspec = require('./api/model-spec.js');

//Couple the application to the Swagger module.
swagger.addModels(modelspec);

//set api info
swagger.setApiInfo({
    swaggerVersion: "2.1",
    title: "Node REST API Documentation"
});

require('./model-docs');

//Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "");

var swaggerUri = process.env.SWAGGER_URI ||
    'http://localhost:3000';

swagger.configure(swaggerUri, "1.0.0");

exports.serveDocs = function (req, res, next) {
    if (req.url === '/docs') { // express static bars on root url w/o trailing slash
        res.writeHead(302, {
            'Location': req.url + '/'
        });
        res.end();
        return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return require("express").static('./docs/swagger-ui/')(req, res, next);
};