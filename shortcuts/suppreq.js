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
      view: suppreq_modal
    });
    console.log(result);
    postMessage(payload)
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
      channel: event.user.id,
      //user: event.user,
      token: userToken,
      text: `Thanks for using suupreq <@${event.user.id}>! @meerkot is here to help you.`
    });
  }
  catch (error) {
    console.error(error);
  }
}

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

/*
https://app.slack.com/block-kit-builder/T01UXKJPUAK
*/
let suppreq_modal = {
  "title":{
    "type":"plain_text",
    "text":"suppreq"
  },
  "submit":{
    "type":"plain_text",
    "text":"Submit"
  },
  "blocks":[
    {
      "type":"input",
      "element":{
        "type":"plain_text_input",
        "action_id":"incident_summary",
        "placeholder":{
          "type":"plain_text",
          "text":"provide single sentence summary of the incident"
        }
      },
      "label":{
        "type":"plain_text",
        "text":"incident summary"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"incident date"
      },
      "accessory":{
        "type":"datepicker",
        "initial_date":"2022-04-11",
        "placeholder":{
          "type":"plain_text",
          "text":"date",
          "emoji":true
        },
        "action_id":"incident_time"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"incident started from"
      },
      "accessory":{
        "type":"timepicker",
        "initial_time":"00:00",
        "placeholder":{
          "type":"plain_text",
          "text":"Select time",
          "emoji":true
        },
        "action_id":"incident_from"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"incident lasted till"
      },
      "accessory":{
        "type":"timepicker",
        "initial_time":"00:00",
        "placeholder":{
          "type":"plain_text",
          "text":"Select time",
          "emoji":true
        },
        "action_id":"incident_till"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"tags"
      },
      "accessory":{
        "type":"multi_static_select",
        "placeholder":{
          "type":"plain_text",
          "text":"select tags related to the incident",
          "emoji":true
        },
        "options":[
          {
            "text":{
              "type":"plain_text",
              "text":"resolved",
              "emoji":true
            },
            "value":"resolved"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"ongoing",
              "emoji":true
            },
            "value":"ongoing"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"support",
              "emoji":true
            },
            "value":"support"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"customer impact",
              "emoji":true
            },
            "value":"customer_impact"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"deployment",
              "emoji":true
            },
            "value":"deployment"
          }
        ],
        "action_id":"incident_tags"
      }
    },
    {
      "type":"input",
      "element":{
        "type":"plain_text_input",
        "action_id":"incident_description",
        "multiline":true,
        "placeholder":{
          "type":"plain_text",
          "text":"describe the incident in details"
        }
      },
      "label":{
        "type":"plain_text",
        "text":"incident details"
      },
      "hint":{
        "type":"plain_text",
        "text":"hint: use bullets for better visibility"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"teams"
      },
      "accessory":{
        "type":"multi_static_select",
        "placeholder":{
          "type":"plain_text",
          "text":"select teams involved (internal or external)",
          "emoji":true
        },
        "options":[
          {
            "text":{
              "type":"plain_text",
              "text":"frontend",
              "emoji":true
            },
            "value":"frontend"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"backend",
              "emoji":true
            },
            "value":"backend"
          },
          {
            "text":{
              "type":"plain_text",
              "text":"database",
              "emoji":true
            },
            "value":"database"
          }
        ],
        "action_id":"incident_teams"
      }
    },
    {
      "type":"section",
      "text":{
        "type":"mrkdwn",
        "text":"members"
      },
      "accessory":{
        "type":"multi_users_select",
        "placeholder":{
          "type":"plain_text",
          "text":"select members involved (internal or external)",
          "emoji":true
        },
        "action_id":"incident_members"
      }
    },
    {
      "type":"input",
      "element":{
        "type":"multi_channels_select",
        "action_id":"incident_channels",
        "placeholder":{
          "type":"plain_text",
          "text":"select channels involved (internal or external)"
        }
      },
      "label":{
        "type":"plain_text",
        "text":"channels"
      }
    }
  ],
  "type":"modal"
}
