#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);

/*
##########
# ACKNOWLEDGE ACTIONS
##########
*/
app.action('meernote_summary', async( { ack} ) => {ack();});
app.action('meernote_time', async( { ack} ) => {ack();});
app.action('meernote_from', async( { ack} ) => {ack();});
app.action('meernote_till', async( { ack} ) => {ack();});
app.action('meernote_tags', async( { ack} ) => {ack();});
app.action('meernote_description', async( { ack} ) => {ack();});
app.action('meernote_teams', async( { ack} ) => {ack();});
app.action('meernote_members', async( { ack} ) => {ack();});
app.action('meernote_channels', async( { ack} ) => {ack();});
