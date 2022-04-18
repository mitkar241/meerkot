#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { app } = require(`${homedir}/app.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { homeview } = require(`${homedir}/handlers/homeview.js`);
const { returnmsg } = require(`${homedir}/handlers/returnmsg.js`);

function handleAppHomeOpened(event) {
  homeview(event);
}

function handleAppMsgOpened(event) {
  returnmsg(event);
}

async function appHomeOpened({ event }) {
  logger.debug({ message: "app home opened", user: event.user, tab: event.tab });
  if (event.tab === "messages") {
    handleAppMsgOpened(event);
  } else {
    handleAppHomeOpened(event);
  }
}

app.event("app_home_opened", appHomeOpened);
