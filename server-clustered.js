/**
 * Created by roexber on 4/07/14.
 */
var cluster = require('cluster'),
    logger = require("./src/logger");

var workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {

    logger.info('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        logger.info('worker %s started.', worker.pid);
    }

    cluster.on('exit', function (worker) {
        logger.info('worker %s died. restart...', worker.process.pid);
        cluster.fork(); // restarts the worker that died
    });

} else {
    require('./server');
}