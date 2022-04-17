#!/usr/bin/env node

const axios = require('axios')
const fs = require('fs');

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { modal } = require(`${homedir}/utils/modal.js`);
const { slack } = require(`${homedir}/utils/slack.js`);
const { appmention } = require(`${homedir}/handlers/appmention.js`);

/*
NOTE: "app_mention" in DM triggers event "message"
*/

app.event('app_mention', app_mention);

async function app_mention({ event }) {
  logger.debug({"message": "app mentioned", "user": event.user, "channel": event.channel, "text": event.text});
  appmention(event);
}
