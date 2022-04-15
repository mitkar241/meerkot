#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);

/*
##########
# ACKNOWLEDGE ACTIONS
##########
*/
app.action('meerback_summary', async( { ack} ) => {ack();});
app.action('meerback_time', async( { ack} ) => {ack();});
app.action('meerback_from', async( { ack} ) => {ack();});
app.action('meerback_till', async( { ack} ) => {ack();});
app.action('meerback_tags', async( { ack} ) => {ack();});
app.action('meerback_description', async( { ack} ) => {ack();});
app.action('meerback_teams', async( { ack} ) => {ack();});
app.action('meerback_members', async( { ack} ) => {ack();});
app.action('meerback_channels', async( { ack} ) => {ack();});
