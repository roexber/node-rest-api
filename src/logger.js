var winston = require("winston"),
    util = require("util"),
    moment = require("moment");

var logMetaDataTemplate = {source: '"node-api"'};
var profileMetaDataTemplate = {source: '"node-api-performance"', level: '"info"'};

winston.handleExceptions(new winston.transports.Console());

var winstonLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'debug' })
    ]
});

function log(level, message, params) {
    var logMetaData = util._extend({}, logMetaDataTemplate);
    if (params !== undefined) {
        logMetaData.message = '"' + util.format(message, params) + '"';
    } else {
        logMetaData.message = '"' + message + '"';
    }
    logMetaData.time = '"' + moment().format('HH:mm:ss.SSS') + '"';
    logMetaData.level = '"' + level + '"';

    winstonLogger.log(level, '', logMetaData);
}

exports.info = function (message, params) {
   log('info', message, params);
};

exports.debug = function (message, params) {
    log('debug', message, params);
};


exports.error = function (message, params) {
    log('error', message, params);
};

exports.profile = function (profilingKey) {
    profiling('info', profilingKey);
};

exports.debugProfile = function (profilingKey) {
    profiling('debug', profilingKey);
};

function profiling(level, profilingKey) {
    var profileMetaData = util._extend({}, profileMetaDataTemplate);
    profileMetaData.action = '"' + profilingKey + '"';
    profileMetaData.time = '"' + moment().format('HH:mm:ss.SSS') + '"';
    profileMetaData.level = '"' + level + '"';
    winston.profile(profilingKey, profileMetaData);
}