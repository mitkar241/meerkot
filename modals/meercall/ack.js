#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);

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
