var detailedModelProperties = {
    "_id": {
        "type": "string",
        "description": "The Unique Identifier of the model"
    },
    "model_name": {
        "type": "string",
        "description": "The name of the model"
    },
    "model_description": {
        "type": "string",
        "description": "The description of the model"
    }
};

exports.models = {

    "DetailedModel": {
        "id": "DetailedModel",
        "type": "object",
        "properties": detailedModelProperties
    }
};
