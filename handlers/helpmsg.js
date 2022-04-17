#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

// Show Help
function helpmsg(event) {
  try {
    let payloadObj = {
      "channel": event.channel,
      "text" : `Hi <@${event.user}>!`,
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": [
              `:robot_face: Hi I am meerkot.`,
              `try /meernote`,
              `try /meercall`,
              `try /meerback`,
            ].join('\n')
          }
        }
      ],
    }

    // if channel type is "im", can't use threads
    if (event.channel_type !== 'im') {
      payloadObj.thread_ts = event.event_ts;
    } else {
      payloadObj.user = event.user;
    }

    slack.postMessage(payloadObj);
  }
  catch (error) {
    logger.error({"message": "posting help message failed", "err": error, "user": event.user, "channel": event.channel, "channel_type": event.channel_type});
  }
}

module.exports = {
    helpmsg: helpmsg
};
