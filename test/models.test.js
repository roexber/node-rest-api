/**
 * Created by roexber on 1/07/14.
 */
var request = require("supertest"),
    app = require("../src/app").app,
    should = require("chai").should();

var httpServer = require('http').createServer(app);
httpServer.listen(3001);

var modelIdToTestWith = "EC6F64C0-563A-4244-93F6-004CE8B3CC02";

it("should return an array of model objects on /model path", function (done) {
    request(app)
        .get("/model")
        .expect(200)
        .end(function (err, res) {
            res.body = JSON.parse(res.text);

            res.body.should.be.a('array').to.have.length.of.at.least(1);
            res.body[0].should.have.property('model_description');
            done();
        });
});

it("should return a model object on /model/{id} path", function (done) {
    request(app)
        .get("/model/" + modelIdToTestWith)
        .expect(200)
        .end(function (err, res) {
            res.body = JSON.parse(res.text);

            res.body.should.have.property('model_description');
            done();
        });
});


it("should return a 404 on /model/{id} path if a non existing ID is passed", function (done) {
    request(app)
        .get("/model/blahdieblah")
        .expect(404)
        .end(function (err, res) {
            done();
        });
});

httpServer.close();