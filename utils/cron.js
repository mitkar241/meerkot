#!/usr/bin/env node

const { CronJob } = require("cron");

/*
##########
# CRON EXP
##########

* * * * * * *
| | | | | | |
| | | | | | +-- Year              (range: 1900-3000)
| | | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
| | | | +------ Month of the Year (range: 1-12)
| | | +-------- Day of the Month  (range: 1-31)
| | +---------- Hour              (range: 0-23)
| +------------ Minute            (range: 0-59)
+-------------- Second            (range: 0-59)
*/

function cron(cronExpression, cronFunction) {
  const cronJob = new CronJob(cronExpression, () => {
    cronFunction();
  }, null, true, "America/Los_Angeles");
  cronJob.start();
}

module.exports = {
  cron,
};
