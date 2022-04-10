#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

app.event('app_home_opened', async ({ event, say }) => {
  try {
    await say(
        model.TextButton(
            event.channel,
            `Thanks for coming back <@${event.user}>! Here's a button`,
            "Button", "click_me_123", "first_button"
            )
        );
  }
  catch (error) {
    console.error(error);
  }
});
