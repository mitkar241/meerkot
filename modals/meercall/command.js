#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

var { meercall_modal } = require(`${__dirname}/model.js`)

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
  command: '/meercall',
  text: '',
  api_app_id: 'A03BKK7EZ8Q',
  is_enterprise_install: 'false',
  response_url: 'https://hooks.slack.com/commands/T01UXKJPUAK/3378207898599/PluOXEC6rnoYAAJ8iVf2mTiS',
  trigger_id: '3405427671473.1983664810359.9b370ecdba333e091a731914d8652806'
}
*/
app.command("/meercall", async ({ack, client, command}) => {
  console.log(command)
  await ack()

  logger.info({"message": "meercall ticket invoked", "user": command.user_name, "command": command.command});
  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: command.trigger_id,
      view: meercall_modal
    });
    //console.log(result);
    postMessageIm(command.user_id)
  }
  catch (error) {
    console.error(error);
  }
});