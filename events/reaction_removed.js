#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
##########
# event
##########
{
  type: 'reaction_removed',
  user: 'U020B1J5LSV',
  reaction: '+1',
  item: { type: 'message', channel: 'C01UXKJPZ39', ts: '1649667351.979889' },
  item_user: 'U03AVSSJERH',
  event_ts: '1649667678.001900'
}
*/

app.event('reaction_removed', async ({ event, say }) => {
  console.log(event)
  try {
    await say(
      model.TextButtonThread(
        event.channel,
        `Thanks for removing reaction <@${event.user}>! Here's a button`,
        "Button", "click_me_123", "first_button",
        event["item"]["ts"]
      )
    );
  }
  catch (error) {
    console.error(error);
  }
});
