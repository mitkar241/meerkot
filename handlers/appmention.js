#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);
const { helpmsg } = require(`${__dirname}/helpmsg.js`);
const { joke } = require(`${__dirname}/joke.js`);
const { modalmsg } = require(`${__dirname}/modalmsg.js`);
const { sportsnews } = require(`${__dirname}/sportsnews.js`);

// add info helps
function appmention(event) {
  if (event.text === `<@${config.bot.id}>`) {
    modalmsg(event);
  } else if(event.text === `<@${config.bot.id}> sports`) {
    sportsnews(event)
  } else if(event.text === `<@${config.bot.id}> joke`) {
    joke(event)
  } else if(event.text === `<@${config.bot.id}> help`) {
    helpmsg(event)
  } else if(event.text === `<@${config.bot.id}> close`) {
    slack.removeRxn(event.channel, event["thread_ts"], "eyes")
    slack.addRxn(event.channel, event["thread_ts"], "white_check_mark")
  }// default - unknown mention
}

module.exports = {
    appmention: appmention
};
