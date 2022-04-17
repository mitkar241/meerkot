#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { homeview } = require(`${homedir}/handlers/homeview.js`);
const { returnmsg } = require(`${homedir}/handlers/returnmsg.js`);

app.event('app_home_opened', app_home_opened);

async function app_home_opened({ event }) {
  logger.debug({"message": "app home opened", "user": event.user, "tab": event.tab});
  if (event.tab === 'messages') {
    handleAppMsgOpened(event);
  } else {
    handleAppHomeOpened(event);
  }
}

function handleAppHomeOpened(event) {
  homeview(event);
}

function handleAppMsgOpened(event) {
  returnmsg(event);
}
