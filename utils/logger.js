#!/usr/bin/env node

const SimpleNodeLogger = require("simple-node-logger");

/*
The log levels include the standard set:
- trace
- debug
- info
- warn
- error
- fatal

The default level is `info`.
The log level can be set at run-time by doing this:
```
log.setLevel('warn');
```
*/

function initLogger() {
    const logLoc = `${__dirname}/../var/log`;
    const logName = "meerkot.log";
    const logFilePath = `${logLoc}/${logName}`;
    const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSS";

    const loggerOpts = {
        logFilePath: logFilePath,
        timestampFormat: timestampFormat,
    };

    const logger = SimpleNodeLogger.createSimpleLogger(loggerOpts);

    return logger;
}

const logger = initLogger();

module.exports = {
    logger: logger,
};
