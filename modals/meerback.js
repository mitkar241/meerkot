#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { modal } = require(`${homedir}/utils/modal.js`);

/*
##########
# ACKNOWLEDGE ACTIONS
##########
*/
app.action("meerback_summary", async ({ ack }) => { ack(); });
app.action("meerback_time", async ({ ack }) => { ack(); });
app.action("meerback_from", async ({ ack }) => { ack(); });
app.action("meerback_till", async ({ ack }) => { ack(); });
app.action("meerback_tags", async ({ ack }) => { ack(); });
app.action("meerback_description", async ({ ack }) => { ack(); });
app.action("meerback_teams", async ({ ack }) => { ack(); });
app.action("meerback_members", async ({ ack }) => { ack(); });
app.action("meerback_channels", async ({ ack }) => { ack(); });

// listener for button
app.action("meerback", modal.action);

// listener for slash command
app.command("/meerback", modal.slashcmd);

// listener for shortcut
app.shortcut("meerback", modal.shortcut);

// app view
app.view("meerback", async ({
  ack, payload,
}) => {
  await ack();
  logger.info({
    message: "received form response", form: "meerback", user: "user",
  });

  const meerbackObj = {};

  const keys = Object.keys(payload.state.values);
  keys.forEach((key) => {
    Object.assign(meerbackObj, payload.state.values[key]);
  });

  const summaryStr = `*${meerbackObj.meerback_summary.value}*`;

  const descStr = `\`\`\`${meerbackObj.meerback_description.value}\`\`\``;

  const channelArr = [];
  meerbackObj.meerback_channels.selected_channels.forEach((element) => {
    channelArr.push(`<#${element}>`);
  });
  const channelStr = channelArr.join(", ");

  const memberArr = [];
  meerbackObj.meerback_members.selected_users.forEach((element) => {
    memberArr.push(`<@${element}>`);
  });
  const memberStr = memberArr.join(", ");

  const tagArr = [];
  meerbackObj.meerback_tags.selected_options.forEach((element) => {
    tagArr.push(`\`${element.value}\``);
  });
  const tagStr = tagArr.join(", ");

  const teamArr = [];
  meerbackObj.meerback_teams.selected_options.forEach((element) => {
    teamArr.push(`\`${element.value}\``);
  });
  const teamStr = teamArr.join(", ");

  await app.client.chat.postMessage(
    {
      channel: config.channel.random,
      text: "incident-report",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: [
              summaryStr,
              descStr,
              `members: ${memberStr}`,
              `teams: ${teamStr}`,
              `channels: ${channelStr}`,
              `tags: ${tagStr}`,
            ].join("\n"),
          },
        },
      ],
    },
  );
});
