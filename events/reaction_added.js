#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
##########
# event
##########
{
  type: 'reaction_added',
  user: 'U020B1J5LSV',
  reaction: '+1',
  item: { type: 'message', channel: 'C01UXKJPZ39', ts: '1649667351.979889' },
  item_user: 'U03AVSSJERH',
  event_ts: '1649667481.001700'
}
*/

app.event('reaction_added', async ({ event, say }) => {
  try {
    await say(
      model.TextButtonThread(
        event.channel,
        `Thanks for adding reaction <@${event.user}>! Here's a button`,
        "Button", "click_me_123", "first_button",
        event["item"]["ts"]
      )
    );
  }
  catch (error) {
    console.error(error);
  }
});
