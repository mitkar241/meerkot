#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

var { meerback_modal } = require(`${__dirname}/model.js`)

app.event('app_mention', async ({ ack, body, client, event, say }) => {
  logger.info({"message": "meerkot app mentioned", "user": event.user, "text": event.text});
  /*if(data.type !== 'message') {
      return;
  }*/
  if (event.text === `<@${config.bot.id}> back`) {
    printMeerBackButton(ack, body, client, event, say)
  }
});

// Show Help
function printMeerBackButton(ack, body, client, event, say) {
  try {
    say(
      {
        "channel": event.channel,
        "thread_ts": event["ts"],
        "text": "Hi I am meerkot",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Create a note ticket using meerback"
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
              },
              "value": "click_me_123",
              "action_id": "meerback"
            }
          }
        ]
      }
    );
  }
  catch (error) {
    console.error(error);
  }
}

/*
[ERROR]   An incoming event was not acknowledged within 3 seconds. Ensure that the ack() argument is called in a listener.
*/
app.action('meerback', async( { ack, body, client, say } ) => {
  // fired when a clicked button's actionId matches
  // Acknowledge action request before anything else
  await ack();

  logger.info({"message": "meerback ticket invoked", "user": body.user.user_name});
  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: meerback_modal
    });
    //console.log(result);
    //postMessageIm(body.user.id)
  }
  catch (error) {
    console.error(error);
  }
});