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
app.action("meercall_summary", async ({ ack }) => { ack(); });
app.action("meercall_time", async ({ ack }) => { ack(); });
app.action("meercall_from", async ({ ack }) => { ack(); });
app.action("meercall_till", async ({ ack }) => { ack(); });
app.action("meercall_tags", async ({ ack }) => { ack(); });
app.action("meercall_description", async ({ ack }) => { ack(); });
app.action("meercall_teams", async ({ ack }) => { ack(); });
app.action("meercall_members", async ({ ack }) => { ack(); });
app.action("meercall_channels", async ({ ack }) => { ack(); });

// listener for button
app.action("meercall", modal.action);

// listener for slash command
app.command("/meercall", modal.slashcmd);

// listener for shortcut
app.shortcut("meercall", modal.shortcut);

// app view
app.view("meercall", async ({
  ack, payload,
}) => {
  await ack();

  logger.info({
    message: "received form response", form: "meercall", user: "user",
  });

  const meercallObj = {};

  const keys = Object.keys(payload.state.values);
  keys.forEach((key) => {
    Object.assign(meercallObj, payload.state.values[key]);
  });

  const summaryStr = `*${meercallObj.meercall_summary.value}*`;

  const timelineStr = `\`${meercallObj.meercall_date.selected_date}\`, \`${meercallObj.meercall_from.selected_time}\``;

  const descStr = `\`\`\`${meercallObj.meercall_description.value}\`\`\``;

  const channelArr = [];
  meercallObj.meercall_channels.selected_channels.forEach((element) => {
    channelArr.push(`<#${element}>`);
  });
  const channelStr = channelArr.join(", ");

  const envArr = [];
  meercallObj.meercall_envs.selected_options.forEach((element) => {
    envArr.push(`\`${element.value}\``);
  });
  const envStr = envArr.join(", ");

  const memberArr = [];
  meercallObj.meercall_members.selected_users.forEach((element) => {
    memberArr.push(`<@${element}>`);
  });
  const memberStr = memberArr.join(", ");

  const tagArr = [];
  meercallObj.meercall_tags.selected_options.forEach((element) => {
    tagArr.push(`\`${element.value}\``);
  });
  const tagStr = tagArr.join(", ");

  const teamArr = [];
  meercallObj.meercall_teams.selected_options.forEach((element) => {
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
              timelineStr,
              descStr,
              `envs: ${envStr}`,
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
