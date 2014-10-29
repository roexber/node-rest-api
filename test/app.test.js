/**
 * Created by roexber on 1/07/14.
 */
var request = require("supertest"),
    app = require("../src/app").app,
    should = require("chai").should();

var httpServer = require('http').createServer(app);
httpServer.listen(3001);

it("should return a 404 response", function (done) {
    request(app)
        .get("/thisdoesnotexist")
        .expect(404, done);
});

httpServer.close();