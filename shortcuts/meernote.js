#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
##########
# SLASH COMMAND : OPTION - 1
##########
*/

/*
##########
# command
##########
{
  token: 'VMnoUR9ckPjtIIMlH8g42H5P',
  team_id: 'T01UXKJPUAK',
  team_domain: 'slackworkspac-ajq2691',
  channel_id: 'C01UXKJPZ39',
  channel_name: 'random',
  user_id: 'U020B1J5LSV',
  user_name: 'mitkar241',
  command: '/meernote',
  text: '',
  api_app_id: 'A03BKK7EZ8Q',
  is_enterprise_install: 'false',
  response_url: 'https://hooks.slack.com/commands/T01UXKJPUAK/3378207898599/PluOXEC6rnoYAAJ8iVf2mTiS',
  trigger_id: '3405427671473.1983664810359.9b370ecdba333e091a731914d8652806'
}
*/
app.command("/meernote", async ({ack, client, command}) => {
  console.log(command)
  await ack()

  logger.info({"message": "meernote ticket invoked", "user": command.user_name, "command": command.command});
  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: command.trigger_id,
      view: meernote_modal
    });
    //console.log(result);
    postMessageIm(command.user_id)
  }
  catch (error) {
    console.error(error);
  }
});

/*
##########
# SHORTCUT : OPTION - 2
##########
*/

// The meernote shortcut opens a plain old modal
// Shortcuts require the command scope
app.shortcut('meernote', async ({ ack, payload, client }) => {
  // Acknowledge shortcut request
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: meernote_modal
    });
    //console.log(result);
    postMessage(payload)
  }
  catch (error) {
    console.error(error);
  }
});

/*
##########
# RETRIEVE DETAILS
##########
*/

app.view('meernote', async ({ ack, body, view, client }) => {
  await ack();

  var meernoteObj = {};

  var keys = Object.keys(view.state.values);
  keys.forEach(key=>{
    Object.assign(meernoteObj, view.state.values[key]);
    console.log(view.state.values[key]);
  });
  console.log(meernoteObj);

  let summaryStr = "*" + meernoteObj["incident_summary"]["value"] + "*"

  let timelineStr = "`" + meernoteObj["incident_time"]["selected_date"] + "`, `" + meernoteObj["incident_from"]["selected_time"] + "` - `" + meernoteObj["incident_from"]["selected_time"] + "`"

  let descStr = "```" + meernoteObj["incident_description"]["value"] + "```"

  let channelArr = []
  meernoteObj["incident_channels"]["selected_channels"].forEach((element) => {
    channelArr.push(`<#${element}>`)
  })
  let channelStr = channelArr.join(', ')

  let memberArr = []
  meernoteObj["incident_members"]["selected_users"].forEach((element) => {
    memberArr.push(`<@${element}>`)
  })
  let memberStr = memberArr.join(', ')

  let tagArr = []
  meernoteObj["incident_tags"]["selected_options"].forEach((element) => {
    tagArr.push("`" + element["value"] + "`")
  })
  let tagStr = tagArr.join(', ')

  let teamArr = []
  meernoteObj["incident_teams"]["selected_options"].forEach((element) => {
    teamArr.push("`" + element["value"] + "`")
  })
  let teamStr = teamArr.join(', ')

  await app.client.chat.postMessage(
    {
      "channel": config.channel["random"],
      "text": "incident-report",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": [
              summaryStr,
              timelineStr,
              descStr,
              "members: " + memberStr,
              "teams: " + teamStr,
              "channels: " + channelStr,
              "tags: " + tagStr,
            ].join('\n'),
          }
        }
      ]
    }
  );

});

/*
##########
# ACKNOWLEDGE ACTIONS
##########
*/
app.action('incident_summary', async( { ack} ) => {ack();});
app.action('incident_time', async( { ack} ) => {ack();});
app.action('incident_from', async( { ack} ) => {ack();});
app.action('incident_till', async( { ack} ) => {ack();});
app.action('incident_tags', async( { ack} ) => {ack();});
app.action('incident_description', async( { ack} ) => {ack();});
app.action('incident_teams', async( { ack} ) => {ack();});
app.action('incident_members', async( { ack} ) => {ack();});
app.action('incident_channels', async( { ack} ) => {ack();});

/*
##########
# POST ACTIONS
##########
*/
function postMessageIm(userid) {
  let userToken = config.bot.access_token
  try {
    // Call the chat.postEphemeral method using the WebClient
    const result = app.client.chat.postMessage({
      channel: userid,
      //user: event.user,
      token: userToken,
      text: `Thanks for using meernote <@${userid}>! @meerkot is here to help you.`
    });
  }
  catch (error) {
    console.error(error);
  }
}

/*
##########
# MODAL USED
##########
*/
/*
https://app.slack.com/block-kit-builder/T01UXKJPUAK
*/
let meernote_modal = {
  "callback_id": 'meernote',
  "title":{
    "type":"plain_text",
    "text":"meernote"
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
        "text":"note: the description will be a code block as a whole"
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

