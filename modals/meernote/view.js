#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

app.view('meernote', async ({ ack, body, payload, client }) => {
  await ack();

  var meernoteObj = {};

  var keys = Object.keys(payload.state.values);
  keys.forEach(key=>{
    Object.assign(meernoteObj, payload.state.values[key]);
  });

  let summaryStr = "*" + meernoteObj["meernote_summary"]["value"] + "*"

  let timelineStr = "`" + meernoteObj["meernote_date"]["selected_date"] + "`, `" + meernoteObj["meernote_from"]["selected_time"] + "` - `" + meernoteObj["meernote_till"]["selected_time"] + "`"

  let descStr = "```" + meernoteObj["meernote_description"]["value"] + "```"

  let channelArr = []
  meernoteObj["meernote_channels"]["selected_channels"].forEach((element) => {
    channelArr.push(`<#${element}>`)
  })
  let channelStr = channelArr.join(', ')

  let envArr = []
  meernoteObj["meernote_envs"]["selected_options"].forEach((element) => {
    envArr.push("`" + element["value"] + "`")
  })
  let envStr = envArr.join(', ')
  
  let memberArr = []
  meernoteObj["meernote_members"]["selected_users"].forEach((element) => {
    memberArr.push(`<@${element}>`)
  })
  let memberStr = memberArr.join(', ')

  let tagArr = []
  meernoteObj["meernote_tags"]["selected_options"].forEach((element) => {
    tagArr.push("`" + element["value"] + "`")
  })
  let tagStr = tagArr.join(', ')

  let teamArr = []
  meernoteObj["meernote_teams"]["selected_options"].forEach((element) => {
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