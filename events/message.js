#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
##########
# event
##########
{
  client_msg_id: '2a5a18db-a483-440f-ab45-6027e644cabd',
  type: 'message',
  text: '<@U03AVSSJERH>',
  user: 'U020B1J5LSV',
  ts: '1649679572.746149',
  team: 'T01UXKJPUAK',
  blocks: [ { type: 'rich_text', block_id: 'xqB', elements: [Array] } ],
  channel: 'D03AP7BL5CN',
  event_ts: '1649679572.746149',
  channel_type: 'im'
}

##########
# channel_type
##########
direct message: 'im'
public group: 'channel'
private group: 'group'
*/

app.event('message', async ({ event, say }) => {
  //if (event.text.includes('<@U03AVSSJERH>') == true) {
  if (event.channel_type !== 'im') {
    return
  }
  try {
    await say(
        model.TextButton(
            event.channel,
            `Thanks for messaging <@${event.user}>! Here's a button`,
            "Button", "click_me_123", "first_button"
            )
        );
    postMessage(event);
  }
  catch (error) {
    console.error(error);
  }
});

function postMessage(event) {
  console.log(event)
  let userToken = "xoxb-XXXX"
  try {
    // Call the chat.postEphemeral method using the WebClient
    const result = app.client.chat.postMessage({
      channel: event.channel,
      //user: event.user,
      token: userToken,
      text: `Thanks for joining the channel <@${event.user}>! @meerkot is here to help you.`
    });
  }
  catch (error) {
    console.error(error);
  }
}
