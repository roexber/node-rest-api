var app = require("./src/app").app,
    logger = require("./src/logger");

var port = Number(process.env.PORT || 3000);
app.listen(port);
logger.info('Listening on port ' + port + '...');