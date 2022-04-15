#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);
var fs = require('fs');

app.event('app_home_opened', async ({ event, say }) => {
  // Display App Home
  const homeView = await updateView(event.user);
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

const updateView = async(user) => {
  let blocks = [ 
  {
    // Section with text and a button
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Welcome!*\nHi I am meerkot!\nLet me know how I can assist you."
    },
    accessory: {
      type: "button",
      action_id: "add_note", 
      text: {
        type: "plain_text",
        text: "Add a Stickie"
      }
    }
  },
  // Horizontal divider line 
  {
    type: "divider"
  }
];

let view = {
  type: 'home',
  title: {
    type: 'plain_text',
    text: 'Keep notes!'
  },
  blocks: blocks
}

return JSON.stringify(view);
};
