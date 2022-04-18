#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

function returnmsg(event) {
  try {
    // welcome user with an ephemeral welcome message
    slack.postEphemeral({
      channel: event.channel,
      user: event.user,
      text: "Thanks for coming back! Let me know how I can help you.",
    });
  } catch (error) {
    logger.error({ message: "posting return message failed", err: error, user: event.user });
  }
}

module.exports = {
  returnmsg,
};
