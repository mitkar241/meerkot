#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { modal } = require(`${homedir}/utils/modal.js`);

/*
##########
# ACKNOWLEDGE ACTIONS
##########
*/
app.action('meercall_summary', async( { ack} ) => {ack();});
app.action('meercall_time', async( { ack} ) => {ack();});
app.action('meercall_from', async( { ack} ) => {ack();});
app.action('meercall_till', async( { ack} ) => {ack();});
app.action('meercall_tags', async( { ack} ) => {ack();});
app.action('meercall_description', async( { ack} ) => {ack();});
app.action('meercall_teams', async( { ack} ) => {ack();});
app.action('meercall_members', async( { ack} ) => {ack();});
app.action('meercall_channels', async( { ack} ) => {ack();});

// listener for button
app.action('meercall', modal.action);

// listener for slash command
app.command("/meercall", modal.slashcmd);

// listener for shortcut
app.shortcut('meercall', modal.shortcut);

// app view
app.view('meercall', async ({ ack, body, payload, client }) => {
  await ack();

  var meercallObj = {};

  var keys = Object.keys(payload.state.values);
  keys.forEach(key=>{
    Object.assign(meercallObj, payload.state.values[key]);
  });

  let summaryStr = "*" + meercallObj["meercall_summary"]["value"] + "*"

  let timelineStr = "`" + meercallObj["meercall_date"]["selected_date"] + "`, `" + meercallObj["meercall_from"]["selected_time"] + "`"

  let descStr = "```" + meercallObj["meercall_description"]["value"] + "```"

  let channelArr = []
  meercallObj["meercall_channels"]["selected_channels"].forEach((element) => {
    channelArr.push(`<#${element}>`)
  })
  let channelStr = channelArr.join(', ')

  let envArr = []
  meercallObj["meercall_envs"]["selected_options"].forEach((element) => {
    envArr.push("`" + element["value"] + "`")
  })
  let envStr = envArr.join(', ')
  
  let memberArr = []
  meercallObj["meercall_members"]["selected_users"].forEach((element) => {
    memberArr.push(`<@${element}>`)
  })
  let memberStr = memberArr.join(', ')

  let tagArr = []
  meercallObj["meercall_tags"]["selected_options"].forEach((element) => {
    tagArr.push("`" + element["value"] + "`")
  })
  let tagStr = tagArr.join(', ')

  let teamArr = []
  meercallObj["meercall_teams"]["selected_options"].forEach((element) => {
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
              "envs: " + envStr,
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