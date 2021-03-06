#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);
const { helpmsg } = require(`${__dirname}/helpmsg.js`);
const { joke } = require(`${__dirname}/joke.js`);
const { modalmsg } = require(`${__dirname}/modalmsg.js`);
const { sportsnews } = require(`${__dirname}/sportsnews.js`);

// add info helps
function appmention(event) {
    logger.debug({
        message: "meerkot app was mentioned", user: event.user, channel: event.channel, channel_type: event.channel_type,
    });
    if (event.text === `<@${config.bot.id}>`) {
        modalmsg(event);
    } else if (event.text === `<@${config.bot.id}> sports`) {
        sportsnews(event);
    } else if (event.text === `<@${config.bot.id}> joke`) {
        joke(event);
    } else if (event.text === `<@${config.bot.id}> help`) {
        helpmsg(event);
    } else if (event.text === `<@${config.bot.id}> close`) {
        slack.removeRxn(event.channel, event.thread_ts, "eyes");
        slack.addRxn(event.channel, event.thread_ts, "white_check_mark");
    } else {
        logger.error({
            message: "no pattern matched on app-mention",
            user: event.user,
            channel: event.channel,
            channel_type: event.channel_type,
        });
    }
}

module.exports = {
    appmention: appmention,
};
