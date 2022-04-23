#!/usr/bin/env node

/* npm packages */

const fs = require("fs");
const yaml = require("js-yaml");

/* common modules */

const { logger } = require(`${__dirname}/logger.js`);

const dirConf = `${__dirname}/../etc/meerkot/meerkot.conf.yaml`;

function parseConf(configFilepath) {
    let configObj = {};
    try {
        const fileContent = fs.readFile(configFilepath, "utf8");
        configObj = yaml.load(fileContent);
    } catch (err) {
        logger.fatal({ msg: "error while parsing Configurations", filename: configFilepath, err: err.stack });
    }
    return configObj;
}

const config = parseConf(`${dirConf}`);

module.exports = {
    config: config,
};
