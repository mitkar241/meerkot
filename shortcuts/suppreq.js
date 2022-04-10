#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { model } = require(`${homedir}/utils/model.js`);

// The suppreq shortcut opens a plain old modal
// Shortcuts require the command scope
app.shortcut('suppreq', async ({ ack, payload, client }) => {
  // Acknowledge shortcut request
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "My App"
        },
        "close": {
          "type": "plain_text",
          "text": "Close"
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Simple modal to add manual entries :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*go for interactive modal*> or <https://api.slack.com/surfaces/modals/using#modifying|*can learn advanced modal*>."
            }
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": "This modal can be designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
              }
            ]
          }
        ]
      }
    });
    //console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});
