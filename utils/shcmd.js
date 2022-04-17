#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { logger } = require(`${homedir}/utils/logger.js`);
const { exec } = require('child_process');

function shellCmdFunc() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                logger.error({"msg" : "error while executing shell command", "command" : cmd, "err" : error.stack, "output" : stdout, "stderr" : stderr});
                return;
            }
            callback(stdout);
        });
    }
}

let shcmd = new shellCmdFunc();

module.exports = {
    shcmd: shcmd
};
