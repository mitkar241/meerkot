#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { app } = require(`${homedir}/app.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { appmention } = require(`${homedir}/handlers/appmention.js`);

/*
NOTE: "app_mention" in DM triggers event "message"
*/

async function appMention({ event }) {
    logger.debug({
        message: "app mentioned", user: event.user, channel: event.channel, text: event.text,
    });
    appmention(event);
}

app.event("app_mention", appMention);
