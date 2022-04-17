#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { modal } = require(`${homedir}/utils/modal.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

function modalmsg(event) {
  logger.debug({"message": "modal message triggered", "user": event.user, "channel": event.channel, "text": event.text});
  
  // if channel type is "im", no point in adding emoji
  if (event.channel_type !== 'im') {
    slack.addRxn(event.channel, event["event_ts"], "eyes")
  }
  
  let buttonElements = []
  let attachTexts = []

  // set button elements and text attached based on
  // whether user is internal or external
  if (config.internal.members.includes(event.user) === true) {
    // internal user
    buttonElements = [modal.button("meernote"), modal.button("meerback")]
    attachTexts = [modal.text("meernote"), modal.text("meerback")]
  } else {
    // external user
    buttonElements = [modal.button("meercall"), modal.button("meerback")]
    attachTexts = [modal.text("meercall"), modal.text("meerback")]
  }

  try {
    let payloadObj = {
        "channel": event.channel,
        "text" : `Hi <@${event.user}>!`,
        "attachments" : [
          {
            "blocks": modal.blocks(attachTexts.join('\n'), buttonElements),
          }
        ],
    }

    // if channel type is "im", can't use threads
    if (event.channel_type !== 'im') {
        payloadObj.thread_ts = event.event_ts;
    }

    // post message with the buttons already added
    slack.postMessage(payloadObj);
  }
  catch (error) {
    logger.error({"message": "posting modal message failed", "err": error, "user": event.user, "channel": event.channel, "channel_type": event.channel_type});
  }
}

module.exports = {
  modalmsg: modalmsg
};
