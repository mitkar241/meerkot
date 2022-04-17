#!/usr/bin/env node

const axios = require('axios')
const homedir = `${__dirname}/..`
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

// Random Joke
function joke(event) {
  axios.get('https://api.chucknorris.io/jokes/random')
    .then(res => {
      let joke = res.data.value;
      try {
        let payloadObj = {
          "channel": event.channel,
          "text" : `Hi <@${event.user}>!`,
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `:zap: ${joke}`,
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
        logger.error({"message": "posting joke message failed", "err": error, "user": event.user, "channel": event.channel, "channel_type": event.channel_type});
      }
    })
}

module.exports = {
    joke: joke
};
