var validator   = require("../src/validator"),
    assert      = require("chai").assert;


it("Should add a validation error", function(done) {
    var validationErrors = [];
    validator.validateExists(undefined, validationErrors, "foo", "foo.foo", "bar");

    assert.equal(validationErrors.length, 1);
    assert.equal(validationErrors[0].field, "foo");
    assert.equal(validationErrors[0].key, "foo.foo");
    assert.equal(validationErrors[0].message, "bar");
    done();
});

it("Should not add a validation error", function(done) {
    var validationErrors = [];
    validator.validateExists("foo", validationErrors, "foo", "foo.foo", "bar");

    assert.equal(validationErrors.length, 0);
    done();
});