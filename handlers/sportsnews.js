#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");

const homedir = `${__dirname}/..`;
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

// print popular sports news
function sportsnews(event) {
  axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&sortBy=popularity&apiKey=${config.newsapi.token}`)
    .then((res) => {
      const currarticles = [];
      const srcarticles = res.data.articles;
      for (let i = 0; i < 5; i += 1) {
        const articleStr = [
          `title : ${srcarticles[i].title}`,
          `source: ${srcarticles[i].source.name}`,
          `desc  : ${srcarticles[i].description}`,
        ].join("\n");
        currarticles.push(articleStr);
      }
      const currArticlesStr = currarticles.join("\n\n");

      const filePath = "/tmp/sports.txt";
      fs.writeFile(filePath, currArticlesStr, (err) => { if (err) throw err; });

      try {
        const fileObj = {
          channels: event.channel,
          initial_comment: `Hi <@${event.user}>! Here is the sports news file`,
          title: "sports news file",
          filename: "logo.png",
          fileType: "text",
          filePath,
        };

        // if channel type is "im", can't use threads
        if (event.channel_type !== "im") {
          fileObj.thread_ts = event.event_ts;
        }

        slack.filesupload(fileObj);
      } catch (error) {
        logger.error({
          message: "posting sports news failed", err: error, user: event.user, channel: event.channel, channel_type: event.channel_type,
        });
      }
    });
}

module.exports = {
  sportsnews,
};
