#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { appmention } = require(`${homedir}/handlers/appmention.js`);

/*
NOTE: "app_mention" in DM triggers event "message"
*/

/*
##########
# channel_type
##########
direct message: 'im'
public group: 'channel'
private group: 'group'
*/

app.event('message', message);

async function message({ event }) {
  logger.debug({"message": "message received", "user": event.user, "channel": event.channel, "text": event.text});
  handleMessage(event)
}

function handleMessage(event) {
  // read other channel / monitor messages here
  if (event.channel_type !== 'im') {
    return
  }
  if (event.text.startsWith(`<@${config.bot.id}>`) === true) {
    appmention(event);
  }
}
