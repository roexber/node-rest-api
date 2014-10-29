/**
 * Created by roexber on 1/07/14.
 */
var models = require('./routes/models');

app.get("/", function (req, res, next) {
    require("express").static('./public')(req, res, next);
});

app.get('/model', models.find);
app.get('/model/:modelId', models.findById);

var enableDocs = process.env.SWAGGER_URI;
if (enableDocs !== undefined) {
    require('swagger-node-express').setAppHandler(app);
    var generateDocs = require("../docs/generate-docs.js");

    // Serve up swagger ui at /docs via static route
    app.get(/^\/docs(\/.*)?$/, generateDocs.serveDocs);
}
/*
 This must ALWAYS be the last defined route!!!

 By default, a 404 is already returned when requested any resource not defined. However, we also want to send a pretty
 error message, so that's why this wildcard is defined.
 */
app.get('*', function(req, resp) {
   resp.status(404).send([{ "message": "The requested resource was not found", "key": "error.resource.notfound", "source": "product.api"}]);
});
