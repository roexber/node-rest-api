/**
 * Created by roexber on 16/07/14.
 */
var mongoose = require('mongoose'),
    logger = require("../logger"),
    errorHandler = require("../errorHandler"),
    responseHandler = require("../responseHandler"),
    util = require('util');

var ModelsModel = mongoose.model('getModel');

var detailedModelProjection = {
    _id: "$model._id",
    model_name: "$model.model_name",
    model_description: "$model.model_description"
};


exports.find = function (req, res) {
    logger.info('models -> find');

	ModelsModel.aggregate([
            { $project: detailedModelProjection}
        ], function (err, models) {
            if (errorHandler.handleResponseError(err, res)) {
                return;
            }

            logger.info("found " + models.length + " models " + JSON.stringify(models));
            responseHandler.handleGetResponse(models, res);
        }
    );
};

exports.findById = function (req, res) {
    logger.info('models -> findById');

    ModelsModel.aggregate([
        { $match: {"_id": req.params.modelId}},
        { $limit: 1},
        { $project: detailedModelProjection}
    ], function (err, model) {
        if (errorHandler.handleResponseError(err, res)) {
            return;
        }

        if (model === null || model === undefined) {
            responseHandler.handleNotFoundResponse(res);
        } else {
            logger.info("found " + model + " models " + JSON.stringify(model));
            responseHandler.handleGetResponse(model[0], res);
        }
    });
};
