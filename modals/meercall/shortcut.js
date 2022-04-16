#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

var { meercall_modal } = require(`${__dirname}/model.js`)

// The meercall shortcut opens a plain old modal
// Shortcuts require the command scope
app.shortcut('meercall', async ({ ack, payload, client }) => {
  // Acknowledge shortcut request
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: meercall_modal
    });
    //console.log(result);
    //postMessage(payload)
  }
  catch (error) {
    console.error(error);
  }
});
