#!/usr/bin/env node

const homedir = `${__dirname}/../..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

/*
https://app.slack.com/block-kit-builder/T01UXKJPUAK
Modal Preview
*/

let meerback_modal = {
	"callback_id": "meerback",
	"title": {
		"type": "plain_text",
		"text": "meerback"
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit"
	},
	"blocks": [
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "meerback_summary",
				"placeholder": {
					"type": "plain_text",
					"text": "provide single sentence summary of the feedback"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "feedback summary"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "tags"
			},
			"accessory": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "select tags related to the feedback",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "enhancement",
							"emoji": true
						},
						"value": "enhancement"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "bug",
							"emoji": true
						},
						"value": "bug"
					},
          {
						"text": {
							"type": "plain_text",
							"text": "crash",
							"emoji": true
						},
						"value": "crash"
					},
          {
						"text": {
							"type": "plain_text",
							"text": "urgent",
							"emoji": true
						},
						"value": "urgent"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "deployment",
							"emoji": true
						},
						"value": "deployment"
					}
				],
				"action_id": "meerback_tags"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "meerback_description",
				"multiline": true,
				"placeholder": {
					"type": "plain_text",
					"text": "describe the feedback in details"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "feedback details"
			},
			"hint": {
				"type": "plain_text",
				"text": "note: the description will be rendered as a code block"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "teams"
			},
			"accessory": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "provide team name",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "frontend",
							"emoji": true
						},
						"value": "frontend"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "backend",
							"emoji": true
						},
						"value": "backend"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "database",
							"emoji": true
						},
						"value": "database"
					}
				],
				"action_id": "meerback_teams"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "members"
			},
			"accessory": {
				"type": "multi_users_select",
				"placeholder": {
					"type": "plain_text",
					"text": "provide member name",
					"emoji": true
				},
				"action_id": "meerback_members"
			}
		},
		{
			"type":"input",
			"element":{
			  "type":"multi_channels_select",
			  "action_id":"meerback_channels",
			  "placeholder":{
				"type":"plain_text",
				"text":"provide channel where meerkot was used"
			  }
			},
			"label":{
			  "type":"plain_text",
			  "text":"channels"
			}
		  }
	],
	"type": "modal"
}

module.exports = {
  meerback_modal: meerback_modal
};
