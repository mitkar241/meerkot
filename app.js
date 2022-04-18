#!/usr/bin/env node

const { App, ExpressReceiver } = require("@slack/bolt");
const express = require("express");

const homedir = `${__dirname}`;
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);

const expressApp = express();

const expressReceiver = new ExpressReceiver({
  router: expressApp,
  signingSecret: config.bot.signing_secret,
  endpoints: "/",
});

const app = new App({
  token: config.bot.access_token,
  signingSecret: config.bot.signing_secret,
  receiver: expressReceiver,
  socketMode: false,
});

(async () => {
  const port = config.bot.port || 3000;
  // Start your app
  await app.start(port);
  logger.info({ message: "meerkot server has started", port });
})();

module.exports = {
  app,
};
