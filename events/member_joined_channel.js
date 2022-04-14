#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
##########
# event
##########
{
  type: 'member_joined_channel',
  user: 'U020B1J5LSV',
  channel: 'C01UXKJPZ39',
  channel_type: 'C',
  team: 'T01UXKJPUAK',
  event_ts: '1649669666.002500'
}

##########
# result
##########
{
  ok: true,
  message_ts: '1649669667.002600',
  response_metadata: {
    scopes: [
      'app_mentions:read',
      'channels:history',
      'channels:read',
      'chat:write',
      'groups:history',
      'groups:read',
      'im:history',
      'incoming-webhook',
      'reactions:read',
      'reactions:write',
      'commands'
    ],
    acceptedScopes: [ 'chat:write' ]
  }
}
*/

app.event('member_joined_channel', async ({ event, client, say }) => {
  let userToken = config.bot.access_token
  try {
    // Call the chat.postEphemeral method using the WebClient
    const result = await client.chat.postEphemeral({
      channel: event.channel,
      user: event.user,
      token: userToken,
      text: `Thanks for joining the channel <@${event.user}>! @meerkot is here to help you.`
    });
  }
  catch (error) {
    console.error(error);
  }
});
