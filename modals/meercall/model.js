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

let meercall_modal = {
	"callback_id": "meercall",
	"title": {
		"type": "plain_text",
		"text": "meercall"
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
				"action_id": "meercall_summary",
				"placeholder": {
					"type": "plain_text",
					"text": "provide single sentence summary of the incident"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "incident summary"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "incident date"
			},
			"accessory": {
				"type": "datepicker",
				"initial_date": "2022-04-11",
				"placeholder": {
					"type": "plain_text",
					"text": "date",
					"emoji": true
				},
				"action_id": "meercall_date"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "incident started from"
			},
			"accessory": {
				"type": "timepicker",
				"initial_time": "00:00",
				"placeholder": {
					"type": "plain_text",
					"text": "Select time",
					"emoji": true
				},
				"action_id": "meercall_from"
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
					"text": "select tags related to the incident",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "support",
							"emoji": true
						},
						"value": "support"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "customer-impact",
							"emoji": true
						},
						"value": "customer-impact"
					},
          {
						"text": {
							"type": "plain_text",
							"text": "query",
							"emoji": true
						},
						"value": "query"
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
				"action_id": "meercall_tags"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "envs"
			},
			"accessory": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "select environments affected by the incident",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "prod-local",
							"emoji": true
						},
						"value": "prod-local"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "prod-cloud",
							"emoji": true
						},
						"value": "prod-cloud"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "dev-local",
							"emoji": true
						},
						"value": "dev-local"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "dev-cloud",
							"emoji": true
						},
						"value": "dev-cloud"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "test-local",
							"emoji": true
						},
						"value": "test-local"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "test-cloud",
							"emoji": true
						},
						"value": "test-cloud"
					},
				],
				"action_id": "meercall_envs"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "meercall_description",
				"multiline": true,
				"placeholder": {
					"type": "plain_text",
					"text": "describe the incident in details"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "incident details"
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
					"text": "select teams involved (internal or external)",
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
				"action_id": "meercall_teams"
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
					"text": "select members involved (internal or external)",
					"emoji": true
				},
				"action_id": "meercall_members"
			}
		},
		{
			"type":"input",
			"element":{
			  "type":"multi_channels_select",
			  "action_id":"meercall_channels",
			  "placeholder":{
				"type":"plain_text",
				"text":"select channels involved (internal or external)"
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
  meercall_modal: meercall_modal
};
