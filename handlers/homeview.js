#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { modal } = require(`${homedir}/utils/modal.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

function homeview(event) {
    logger.debug({ message: "app home tab open triggered", user: event.user });

    let buttonElements = [];
    let attachTexts = [];

    // set button elements and text attached based on
    // whether user is internal or external
    if (config.internal.members.includes(event.user) === true) {
    // internal user
        buttonElements = [ modal.button("meernote"), modal.button("meerback") ];
        attachTexts = [ modal.text("meernote"), modal.text("meerback") ];
    } else {
    // external user
        buttonElements = [ modal.button("meercall"), modal.button("meerback") ];
        attachTexts = [ modal.text("meercall"), modal.text("meerback") ];
    }

    const homeView = {
        type: "home",
        title: {
            type: "plain_text",
            text: "meerkot home",
        },
        blocks: modal.blocks(attachTexts.join("\n"), buttonElements),
    };

    try {
        slack.viewspublish({
            user_id: event.user,
            view: homeView,
        });
    } catch (error) {
        logger.error({ message: "opening view in home tab failed", err: error, user: event.user });
    }
}

module.exports = {
    homeview: homeview,
};
