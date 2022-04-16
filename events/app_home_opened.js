#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);
var fs = require('fs');

app.event('app_home_opened', async ({ event, say }) => {
  // Display App Home
  const homeView = await updateView();
  try {
    const result = await app.client.views.publish({
      token: config.bot.access_token,
      user_id: event.user,
      view: homeView
    });
    
  } catch(e) {
    app.error(e);
  }

  if (event.tab === 'messages') {
    let userToken = config.bot.access_token
    try {
      console.log(event)
      // Call the chat.postEphemeral method using the WebClient
      const result = await app.client.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        token: userToken,
        text: `Thanks for coming back! let me know how I can help you.`
      });
      //postMessage(event)
    }
    catch (error) {
      console.error(error);
    }
  }
});

function postMessage(event) {
  console.log(event)
  let userToken = config.bot.access_token
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

const updateView = async() => {
  buttonElements = [modalButtonObj.meernote.button, modalButtonObj.meercall.button, modalButtonObj.meerback.button]
    attachText = [
      " • raise a ticket to explain the type of support required",
      " • provide feedback",
    ].join('\n')
  let blocks = [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "meerkot support",
        "emoji": true
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": attachText,
      }
    },
    {
      "type": "actions",
      "elements": buttonElements,
    },
    {
      "type": "divider"
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": config.bot.logo,
          "alt_text": "meerkot-logo"
        },
        {
          "type": "mrkdwn",
          "text": "*meerkot*, a slackbot maintained by the *DevOps* team."
        }
      ]
    }
  ];

let view = {
  type: 'home',
  title: {
    type: 'plain_text',
    text: 'meerkot home'
  },
  blocks: blocks
}

return JSON.stringify(view);
};

let modalButtonObj = {
  "meernote": {
    "button": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "note incident",
        "emoji": true
      },
      "style": "primary",
      "value": "meernote",
      "action_id": "meernote"
    },
  },
  "meercall": {
    "button": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "on-call support",
        "emoji": true
      },
      "style": "danger",
      "value": "meercall",
      "action_id": "meercall"
    },
  },
  "meerback": {
    "button": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "feedback",
        "emoji": true
      },
      "value": "meerback",
      "action_id": "meerback"
    },
  },
}
