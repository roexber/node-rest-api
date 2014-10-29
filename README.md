Node REST api
===================

Ready to be deployed to Heroku.
https://devcenter.heroku.com/articles/getting-started-with-nodejs

node modules:
express // handling GET PUT POST DELETE
mongoose // mongoDB connection
body-parser // converting from and to JSON
compression // GZIP JSON responses
winston // logging
moment // date time utilities
swagger-node-express // documentation

devDependencies:
chai // assertions
grunt // javascript task runner
grunt-cli // grunt command line interface
grunt-contrib-jshint // javascript code quality
grunt-contrib-watch // trigger tasks on code change
grunt-express-server // start express server from grunt
grunt-mocha-istanbul // code coverage reporting based on mocha tests
grunt-open // ability to open browser tab using task
grunt-parallel // run multiple grunt tasks in parallel
grunt-simple-mocha // run mocha tests using grunt task
grunt-wait // adding a delay to make sure server is running before opening a browser window
load-grunt-tasks // auto discovery of grunt tasks to load from package.json
mocha // running tests
supertest // setting up headless browser for testing purposes

run this app by using its default Grunt task:
grunt

if grunt is not recognized:
npm install -g grunt-cli

Testing done with
chai
mocha
supertest

Reporting Coverage
istanbul