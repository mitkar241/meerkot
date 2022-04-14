#!/usr/bin/env node

const SimpleNodeLogger = require('simple-node-logger');

function initLogger(){
    const logLoc = `${__dirname}/../var/log`;
    const logName = `meerkot.log`;
    const logFilePath = `${logLoc}/${logName}`;
    const timestampFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

    let loggerOpts = {
        logFilePath: logFilePath,
        timestampFormat: timestampFormat
    }

    let logger = SimpleNodeLogger.createSimpleLogger(loggerOpts);
    
    return logger;
}

let logger = initLogger();

module.exports = {
    logger: logger
};
