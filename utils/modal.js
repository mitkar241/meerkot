#!/usr/bin/env node

const homedir = `${__dirname}/..`;
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);
const { slack } = require(`${homedir}/utils/slack.js`);

class Modal {
    text(modalname) {
        const textObj = {
            meernote: " • raise a ticket to note on-call incident",
            meercall: " • raise a ticket to explain the type of support required",
            meerback: " • provide feedback",
        };

        if (modalname in textObj === false) {
            // fatal error
            return "";
        }
        return textObj[modalname];
    }

    button(modalname) {
        const buttonObj = {
            meernote: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "note incident",
                    emoji: true,
                },
                style: "primary",
                value: "meernote",
                action_id: "meernote",
            },
            meercall: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "on-call support",
                    emoji: true,
                },
                style: "danger",
                value: "meercall",
                action_id: "meercall",
            },
            meerback: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "feedback",
                    emoji: true,
                },
                value: "meerback",
                action_id: "meerback",
            },
        };

        if (modalname in buttonObj === false) {
            // fatal error
            return {};
        }
        return buttonObj[modalname];
    }

    blocks(attachText, buttonElements) {
        const blocks = [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "meerkot support",
                    emoji: true,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: attachText,
                },
            },
            {
                type: "actions",
                elements: buttonElements,
            },
            {
                type: "divider",
            },
            {
                type: "context",
                elements: [
                    {
                        type: "image",
                        image_url: config.bot.logo,
                        alt_text: "meerkot-logo",
                    },
                    {
                        type: "mrkdwn",
                        text: "*meerkot*, a slackbot maintained by the *DevOps* team.",
                    },
                ],
            },
        ];
        return blocks;
    }

    async action({ ack, body, payload }) {
        await ack();

        logger.debug({
            message: "ticket invoked", method: "button", user: body.user.user_name, form: payload.value,
        });
        try {
            const modalkey = payload.value;
            slack.viewsopen({
                trigger_id: body.trigger_id,
                view: model[modalkey],
            });
        } catch (error) {
            logger.error({
                message: "modal display failed", err: error, method: "button", user: body.user.user_name, form: payload.value,
            });
        }
    }

    async slashcmd({ ack, command }) {
        await ack();

        logger.debug({
            message: "ticket invoked", method: "slashcmd", user: command.user_name, command: command.command,
        });
        try {
            const modalkey = command.command.split(" ")[0].split("/")[1];
            slack.viewsopen({
                trigger_id: command.trigger_id,
                view: model[modalkey],
            });
        } catch (error) {
            logger.error({
                message: "modal display failed", err: error, method: "slashcmd", user: command.user_name, command: command.command,
            });
        }
    }

    async shortcut({ ack, payload }) {
    // Acknowledge shortcut request
        await ack();

        logger.debug({ message: "ticket invoked", method: "shortcut", form: payload.callback_id });
        try {
            const modalkey = payload.callback_id;
            slack.viewsopen({
                trigger_id: payload.trigger_id,
                view: model[modalkey],
            });
        } catch (error) {
            logger.error({
                message: "modal display failed", err: error, method: "shortcut", form: payload.callback_id,
            });
        }
    }
}

const modal = new Modal();

module.exports = {
    modal: modal,
};
