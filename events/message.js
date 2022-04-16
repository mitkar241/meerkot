#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

/*
"app_mention" in IM triggers event "message"
*/

/*
##########
# event
##########
{
  client_msg_id: '2a5a18db-a483-440f-ab45-6027e644cabd',
  type: 'message',
  text: '<@U03AVSSJERH>',
  user: 'U020B1J5LSV',
  ts: '1649679572.746149',
  team: 'T01UXKJPUAK',
  blocks: [ { type: 'rich_text', block_id: 'xqB', elements: [Array] } ],
  channel: 'D03AP7BL5CN',
  event_ts: '1649679572.746149',
  channel_type: 'im'
}

##########
# channel_type
##########
direct message: 'im'
public group: 'channel'
private group: 'group'
*/

app.event('message', async ({ ack, body, client, event, say }) => {
  try {
    //if (event.text.includes('<@U03AVSSJERH>') == true) {
    if (event.channel_type !== 'im') {
      return
    }
    if (event.text === `<@${config.bot.id}>`) {
      printWelcomeMsg(ack, body, client, event, say)
    }
  }
  catch (error) {
    console.error(error);
  }
});

function printWelcomeMsg(ack, body, client, event, say) {
  logger.info({"message": "meerkot app mentioned", "user": event.user, "text": event.text});
  console.log("event", event)
  
  let buttonElements = []
  let attachText = ""
  if (config.internal.members.includes(event.user) === true) {
    buttonElements = [model.modal.meernote.button, model.modal.meerback.button]
    attachText = [
      " • raise a ticket to note on-call incident",
      " • provide feedback",
    ].join('\n')
  } else {
    buttonElements = [model.modal.meercall.button, model.modal.meerback.button]
    attachText = [
      " • raise a ticket to explain the type of support required",
      " • provide feedback",
    ].join('\n')
  }

  try {
    slack.postMessage({
      "channel": event.user,
      "text" : `Hi <@${event.user}>!`,
      "attachments" : [
        {
          "blocks": model.getModalBlocks(attachText, buttonElements),
        }
      ],
  });
  }
  catch (error) {
    console.error(error);
  }
}
