exports.ValidationException = function(validationErrors) {
    this.validationErrors = validationErrors;
};

exports.ValidationException.prototype = Object.create(Error.prototype);

function ValidationError(field, key, message) {
    this.field = field;
    this.key = key;
    this.message = message;
}

exports.validateExists = function(param, validationErrors, field, key, message) {
    if (param === undefined) {
        validationErrors.push(new ValidationError(field, key, message));
    }
};