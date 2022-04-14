#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);
/*
{
  client_msg_id: '37b80a63-0b1c-4a76-99b6-1079522d1e41',
  type: 'app_mention',
  text: '<@U03AVSSJERH>',
  user: 'U020B1J5LSV',
  ts: '1649679658.682269',
  team: 'T01UXKJPUAK',
  blocks: [ { type: 'rich_text', block_id: 'JiRP', elements: [Array] } ],
  channel: 'C021ULNQ46A',
  event_ts: '1649679658.682269'
}
*/

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ ack, body, client, event, say }) => {
  logger.info({"message": "meerkot app mentioned", "user": event.user, "text": event.text});
  if (event.text === `<@${config.bot.id}> support`) {
    //console.log("body", body)
    //console.log("event", event)
    logger.info({"message": "meerkot app mentioned", "user": event.user, "text": event.text});
    try {
      // Call the views.open method using the WebClient passed to listeners
      const result = await client.views.open({
        trigger_id: "XXXXXXXXXX",
        view: meerport_modal
      });
      //console.log(result);
      postMessage(payload)
    }
    catch (error) {
      console.error(error);
    }
  }
  try {
    await say(
      {
        "channel": event.channel,
        "thread_ts": event["ts"],
        "text": "Hi I am meerkot",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": [
                `Hi <@${event.user}>!`,
                "I am `meerkot` :robot_face:",
                "can you kindly fill a `meercall` ticket?",
                "(this helps narrow down the scope)",
                "<slack.com/intl/en-in/features/workflow-automation|link to search for meercall ticket>",
              ].join('\n'),
            }
          }
        ]
      }
    );
  }
  catch (error) {
    console.error(error);
  }
});

/*
[ERROR]   An incoming event was not acknowledged within 3 seconds. Ensure that the ack() argument is called in a listener.
*/
app.action('app_mention', async( { ack, body, say } ) => {
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
            "Button", "app_mention_value", "first_button"
            )
        );
  }
  catch (error) {
    console.error(error);
  }
});
