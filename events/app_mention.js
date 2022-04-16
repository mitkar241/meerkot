#!/usr/bin/env node

const axios = require('axios')
const fs = require('fs');

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
{
  client_msg_id: '37b80a63-0b1c-4a76-99b6-1079522d1e41',
  type: 'app_mention',
  text: '<@U03AVSSJERH>',
  user: 'U020B1J5LSV',
  ts: '1649679658.682269',
  team: 'T01UXKJPUAK',
  blocks: [ { type: 'rich_text', block_id: 'JiRP', elements: [Array] } ],
  channel: 'C021ULNQ46A',
  event_ts: '1649679658.682269'
}
*/

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ ack, body, client, event, say }) => {
  logger.info({"message": "meerkot app mentioned", "user": event.user, "channel": event.channel, "text": event.text});
  /*if(data.type !== 'message') {
      return;
  }*/
  handleAppMention(ack, body, client, event, say);
});

// Response Handler
// add info
function handleAppMention(ack, body, client, event, say) {
  if (event.text === `<@${config.bot.id}>`) {
    printWelcomeMsg(ack, body, client, event, say)
  } else if(event.text === `<@${config.bot.id}> sports`) {
    printPopularSportsNews(ack, body, client, event, say)
  } else if(event.text === `<@${config.bot.id}> joke`) {
      printRandomJoke(ack, body, client, event, say)
  } else if(event.text === `<@${config.bot.id}> help`) {
    printHelp(ack, body, client, event, say)
  } else if(event.text === `<@${config.bot.id}> close`) {
    slack.removeRxn(event.channel, event["thread_ts"], "eyes")
    slack.addRxn(event.channel, event["thread_ts"], "white_check_mark")
  }
}

function printWelcomeMsg(ack, body, client, event, say) {
  logger.info({"message": "meerkot app mentioned", "user": event.user, "text": event.text});
  console.log("event", event)
  slack.addRxn(event.channel, event["event_ts"], "eyes")
  
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
      "channel": event.channel,
      "thread_ts" : event["ts"],
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

// print popular news
function printPopularSportsNews(ack, body, client, event, say) {
  axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&sortBy=popularity&apiKey=${config.newsapi.token}`)
    .then(res => {
      let currarticles = []
      const srcarticles = res.data.articles;
      for(var i = 0; i < 5; i++) {
        let articleStr = [
          "title : " + srcarticles[i].title,
          "source: " + srcarticles[i].source.name,
          "desc  : " + srcarticles[i].description,
        ].join('\n')
        currarticles.push(articleStr)
      }
      let currArticlesStr = currarticles.join('\n\n')
      
      filePath = '/tmp/sports.txt'
      fs.writeFile(filePath, currArticlesStr, (err) => { if (err) throw err; });
      
      try {
        console.log(event)
        slack.fileupload({
          channels: event.channel,
          thread_ts: event["event_ts"],
          initial_comment: `Hi <@${event.user}>! Here is the sports news file`,
          title: 'sports news file',
          filename: 'logo.png',
          fileType: 'text',
          filePath: filePath,
        })
      }
      catch (error) {
        console.error(error);
      }
    })
}

// Random Joke
function printRandomJoke(ack, body, client, event, say) {
  axios.get('https://api.chucknorris.io/jokes/random')
    .then(res => {
          let joke = res.data.value;
          try {
            say(
              {
                "channel": event.channel,
                "thread_ts": event["ts"],
                "text": "Hi I am meerkot",
                "blocks": [
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": `:zap: ${joke}`,
                    }
                  }
                ]
              }
            );
          }
          catch (error) {
            console.error(error);
          }
    })
}

// Show Help
function printHelp(ack, body, client, event, say) {
  try {
    say(
      {
        "channel": event.channel,
        "thread_ts": event["ts"],
        "text": "Hi I am meerkot",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:robot_face: Hi I am meerkot.\ntry /meernote\ntry /meercall\ntry /meerback`,
            }
          }
        ]
      }
    );
  }
  catch (error) {
    console.error(error);
  }
}
