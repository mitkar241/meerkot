#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { config } = require(`${homedir}/utils/config.js`);

class Model {

  modal = {
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

  getModalBlocks(attachText, buttonElements) {
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
    return blocks
  }

}

let model = new Model();

module.exports = {
    model: model
};
