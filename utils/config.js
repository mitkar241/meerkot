#!/usr/bin/env node

/* npm packages */
const fs = require('fs');
const yaml = require('js-yaml');
/* common modules */
const { logger } = require(`${__dirname}/logger.js`);

const dir_conf = `${__dirname}/../etc/meerkot/meerkot.conf.yaml`;

function parseConf(configFilepath){
    configObj = {};
    try {
        let fileContent = fs.readFileSync(configFilepath, 'utf8');
        configObj = yaml.load(fileContent);
    } catch (err) {
        logger.fatal({"msg": "error while parsing Configurations", "filename": configFilepath, "err": err.stack});
    }
    return configObj;
}

let config = parseConf(`${dir_conf}`);

module.exports = {
    config: config
};
