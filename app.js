#!/usr/bin/env node

const { App } = require('@slack/bolt');

const SLACK_BOT_TOKEN = "xoxb-XXXX"
const SLACK_SIGNING_SECRET = "XXXX"

const app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET
    /*endpoints: {
        events: '/events',
        commands: '/commands'
    }*/
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

module.exports = {
    app: app
};
