#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ event, say }) => {
  try {
    await say(
        model.TextButton(
            event.channel,
            `Thanks for the mention <@${event.user}>! Here's a button`,
            "Button", "click_me_123", "first_button"
            )
        );
  }
  catch (error) {
    console.error(error);
  }
});

/*
[ERROR]   An incoming event was not acknowledged within 3 seconds. Ensure that the ack() argument is called in a listener.
*/
app.action('first_button', async( { ack, body, say } ) => {
  // fired when a clicked button's actionId matches
  // Acknowledge action request before anything else
  await ack();
  console.log("body", body)
  try {
    // do work
    await say(
        model.TextButton(
            body.channel.id,
            `Thanks for clicking the button <@${body.user.id}>! Here's a button`,
            "Button", "click_me_123", "first_button"
            )
        );
  }
  catch (error) {
    console.error(error);
  }
});
