#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { logger } = require(`${homedir}/utils/logger.js`);
const { exec } = require("child_process");

function ShCmdFunc() {
  this.execCommand = function (cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        logger.error({
          msg: "error while executing shell command", command: cmd, err: error.stack, output: stdout, stderr,
        });
        return;
      }
      callback(stdout);
    });
  };
}

const shcmd = new ShCmdFunc();

module.exports = {
  shcmd,
};
