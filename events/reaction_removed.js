#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

app.event('reaction_removed', async ({ event, say }) => {
  try {
    await say(
        model.TextButton(
            event.channel,
            `Thanks for removing reaction <@${event.user}>! Here's a button`,
            "Button", "click_me_123", "first_button"
            )
        );
  }
  catch (error) {
    console.error(error);
  }
});
