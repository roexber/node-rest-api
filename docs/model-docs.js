/**
 * Created by jensdt on 06/08/14.
 */
var swagger = require('swagger-node-express'),
    models = require('../src/routes/models');

swagger.addGet({
    'spec': {
        description: "Operations about Models",
        path: "/model",
        notes: "Find models",
        summary: "Find all models",
        method: "GET",
        type: "DetailedModel",
        errorResponses: [{
            "code": 200,
            "message": 'OK',
            "reason": 'The request was successful and the response body contains the full resource representation',
            "responseModel": "DetailedModel"
        }],
        nickname: "findModels"
    },
    'action': models.find
});

swagger.addGet({
    'spec': {
        description: "Operations about Models",
        path: "/model/{modelId}",
        notes: "Find model by ID",
        summary: "Find a models by ID",
        method: "GET",
        type: "DetailedModel",
        parameters: [swagger.pathParam("modelId", "The model id", "string")],
        errorResponses: [{
            "code": 200,
            "message": 'OK',
            "reason": 'The request was successful and the response body contains the full resource representation',
            "responseModel": "DetailedModel"
        }, {
            "code": 404,
            "message": 'NOT FOUND',
            "reason": 'The requested resource could not be found'
        }],
        nickname: "findModelById"
    },
    'action': models.findById
});

swagger.configureDeclaration('model', {
    description: 'Operations about Models'
});