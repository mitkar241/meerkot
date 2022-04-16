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

const updateView = async() => {
  buttonElements = [model.modal.meernote.button, model.modal.meercall.button, model.modal.meerback.button]
  attachText = [
    " • raise a ticket to explain the type of support required",
    " • provide feedback",
  ].join('\n')

  let view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'meerkot home'
    },
    blocks: model.getModalBlocks(attachText, buttonElements),
  }

  return JSON.stringify(view);
};
