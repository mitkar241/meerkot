#!/usr/bin/env node

/*
https://app.slack.com/block-kit-builder/T01UXKJPUAK
Modal Preview
*/

const model = {};

/*
- functionify model
- make use of dynamic blocks
- new Date().toLocaleDateString('en-CA', {timeZone: "UTC"}); //2022-04-17
- add initial values
- migrate from channel to conversation including private channels
*/

model.meernote = {
  callback_id: "meernote",
  title: {
    type: "plain_text",
    text: "meernote",
  },
  submit: {
    type: "plain_text",
    text: "Submit",
  },
  blocks: [
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meernote_summary",
        placeholder: {
          type: "plain_text",
          text: "provide single sentence summary of the incident",
        },
      },
      label: {
        type: "plain_text",
        text: "incident summary",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "incident date",
      },
      accessory: {
        type: "datepicker",
        initial_date: "2022-04-11",
        placeholder: {
          type: "plain_text",
          text: "date",
          emoji: true,
        },
        action_id: "meernote_date",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "incident started from",
      },
      accessory: {
        type: "timepicker",
        initial_time: "00:00",
        placeholder: {
          type: "plain_text",
          text: "Select time",
          emoji: true,
        },
        action_id: "meernote_from",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "incident lasted till",
      },
      accessory: {
        type: "timepicker",
        initial_time: "00:00",
        placeholder: {
          type: "plain_text",
          text: "Select time",
          emoji: true,
        },
        action_id: "meernote_till",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "tags",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select tags related to the incident",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "resolved",
              emoji: true,
            },
            value: "resolved",
          },
          {
            text: {
              type: "plain_text",
              text: "ongoing",
              emoji: true,
            },
            value: "ongoing",
          },
          {
            text: {
              type: "plain_text",
              text: "support",
              emoji: true,
            },
            value: "support",
          },
          {
            text: {
              type: "plain_text",
              text: "customer impact",
              emoji: true,
            },
            value: "customer_impact",
          },
          {
            text: {
              type: "plain_text",
              text: "deployment",
              emoji: true,
            },
            value: "deployment",
          },
        ],
        action_id: "meernote_tags",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "envs",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select environments affected by the incident",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "prod-local",
              emoji: true,
            },
            value: "prod-local",
          },
          {
            text: {
              type: "plain_text",
              text: "prod-cloud",
              emoji: true,
            },
            value: "prod-cloud",
          },
          {
            text: {
              type: "plain_text",
              text: "dev-local",
              emoji: true,
            },
            value: "dev-local",
          },
          {
            text: {
              type: "plain_text",
              text: "dev-cloud",
              emoji: true,
            },
            value: "dev-cloud",
          },
          {
            text: {
              type: "plain_text",
              text: "test-local",
              emoji: true,
            },
            value: "test-local",
          },
          {
            text: {
              type: "plain_text",
              text: "test-cloud",
              emoji: true,
            },
            value: "test-cloud",
          },
        ],
        action_id: "meernote_envs",
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meernote_description",
        multiline: true,
        placeholder: {
          type: "plain_text",
          text: "describe the incident in details",
        },
      },
      label: {
        type: "plain_text",
        text: "incident details",
      },
      hint: {
        type: "plain_text",
        text: "note: the description will be rendered as a code block",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "teams",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select teams involved (internal or external)",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "frontend",
              emoji: true,
            },
            value: "frontend",
          },
          {
            text: {
              type: "plain_text",
              text: "backend",
              emoji: true,
            },
            value: "backend",
          },
          {
            text: {
              type: "plain_text",
              text: "database",
              emoji: true,
            },
            value: "database",
          },
        ],
        action_id: "meernote_teams",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "members",
      },
      accessory: {
        type: "multi_users_select",
        placeholder: {
          type: "plain_text",
          text: "select members involved (internal or external)",
          emoji: true,
        },
        action_id: "meernote_members",
      },
    },
    {
      type: "input",
      element: {
        type: "multi_channels_select",
        action_id: "meernote_channels",
        placeholder: {
          type: "plain_text",
          text: "select channels involved (internal or external)",
        },
      },
      label: {
        type: "plain_text",
        text: "channels",
      },
    },
  ],
  type: "modal",
};

model.meercall = {
  callback_id: "meercall",
  title: {
    type: "plain_text",
    text: "meercall",
  },
  submit: {
    type: "plain_text",
    text: "Submit",
  },
  blocks: [
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meercall_summary",
        placeholder: {
          type: "plain_text",
          text: "provide single sentence summary of the incident",
        },
      },
      label: {
        type: "plain_text",
        text: "incident summary",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "incident date",
      },
      accessory: {
        type: "datepicker",
        initial_date: "2022-04-11",
        placeholder: {
          type: "plain_text",
          text: "date",
          emoji: true,
        },
        action_id: "meercall_date",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "incident started from",
      },
      accessory: {
        type: "timepicker",
        initial_time: "00:00",
        placeholder: {
          type: "plain_text",
          text: "Select time",
          emoji: true,
        },
        action_id: "meercall_from",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "tags",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select tags related to the incident",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "support",
              emoji: true,
            },
            value: "support",
          },
          {
            text: {
              type: "plain_text",
              text: "customer-impact",
              emoji: true,
            },
            value: "customer-impact",
          },
          {
            text: {
              type: "plain_text",
              text: "query",
              emoji: true,
            },
            value: "query",
          },
          {
            text: {
              type: "plain_text",
              text: "urgent",
              emoji: true,
            },
            value: "urgent",
          },
          {
            text: {
              type: "plain_text",
              text: "deployment",
              emoji: true,
            },
            value: "deployment",
          },
        ],
        action_id: "meercall_tags",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "envs",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select environments affected by the incident",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "prod-local",
              emoji: true,
            },
            value: "prod-local",
          },
          {
            text: {
              type: "plain_text",
              text: "prod-cloud",
              emoji: true,
            },
            value: "prod-cloud",
          },
          {
            text: {
              type: "plain_text",
              text: "dev-local",
              emoji: true,
            },
            value: "dev-local",
          },
          {
            text: {
              type: "plain_text",
              text: "dev-cloud",
              emoji: true,
            },
            value: "dev-cloud",
          },
          {
            text: {
              type: "plain_text",
              text: "test-local",
              emoji: true,
            },
            value: "test-local",
          },
          {
            text: {
              type: "plain_text",
              text: "test-cloud",
              emoji: true,
            },
            value: "test-cloud",
          },
        ],
        action_id: "meercall_envs",
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meercall_description",
        multiline: true,
        placeholder: {
          type: "plain_text",
          text: "describe the incident in details",
        },
      },
      label: {
        type: "plain_text",
        text: "incident details",
      },
      hint: {
        type: "plain_text",
        text: "note: the description will be rendered as a code block",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "teams",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select teams involved (internal or external)",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "frontend",
              emoji: true,
            },
            value: "frontend",
          },
          {
            text: {
              type: "plain_text",
              text: "backend",
              emoji: true,
            },
            value: "backend",
          },
          {
            text: {
              type: "plain_text",
              text: "database",
              emoji: true,
            },
            value: "database",
          },
        ],
        action_id: "meercall_teams",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "members",
      },
      accessory: {
        type: "multi_users_select",
        placeholder: {
          type: "plain_text",
          text: "select members involved (internal or external)",
          emoji: true,
        },
        action_id: "meercall_members",
      },
    },
    {
      type: "input",
      element: {
        type: "multi_channels_select",
        action_id: "meercall_channels",
        placeholder: {
          type: "plain_text",
          text: "select channels involved (internal or external)",
        },
      },
      label: {
        type: "plain_text",
        text: "channels",
      },
    },
  ],
  type: "modal",
};

model.meerback = {
  callback_id: "meerback",
  title: {
    type: "plain_text",
    text: "meerback",
  },
  submit: {
    type: "plain_text",
    text: "Submit",
  },
  blocks: [
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meerback_summary",
        placeholder: {
          type: "plain_text",
          text: "provide single sentence summary of the feedback",
        },
      },
      label: {
        type: "plain_text",
        text: "feedback summary",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "tags",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "select tags related to the feedback",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "enhancement",
              emoji: true,
            },
            value: "enhancement",
          },
          {
            text: {
              type: "plain_text",
              text: "bug",
              emoji: true,
            },
            value: "bug",
          },
          {
            text: {
              type: "plain_text",
              text: "crash",
              emoji: true,
            },
            value: "crash",
          },
          {
            text: {
              type: "plain_text",
              text: "urgent",
              emoji: true,
            },
            value: "urgent",
          },
          {
            text: {
              type: "plain_text",
              text: "deployment",
              emoji: true,
            },
            value: "deployment",
          },
        ],
        action_id: "meerback_tags",
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "meerback_description",
        multiline: true,
        placeholder: {
          type: "plain_text",
          text: "describe the feedback in details",
        },
      },
      label: {
        type: "plain_text",
        text: "feedback details",
      },
      hint: {
        type: "plain_text",
        text: "note: the description will be rendered as a code block",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "teams",
      },
      accessory: {
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "provide team name",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "frontend",
              emoji: true,
            },
            value: "frontend",
          },
          {
            text: {
              type: "plain_text",
              text: "backend",
              emoji: true,
            },
            value: "backend",
          },
          {
            text: {
              type: "plain_text",
              text: "database",
              emoji: true,
            },
            value: "database",
          },
        ],
        action_id: "meerback_teams",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "members",
      },
      accessory: {
        type: "multi_users_select",
        placeholder: {
          type: "plain_text",
          text: "provide member name",
          emoji: true,
        },
        action_id: "meerback_members",
      },
    },
    {
      type: "input",
      element: {
        type: "multi_channels_select",
        action_id: "meerback_channels",
        placeholder: {
          type: "plain_text",
          text: "provide channel where meerkot was used",
        },
      },
      label: {
        type: "plain_text",
        text: "channels",
      },
    },
  ],
  type: "modal",
};

module.exports = {
  model,
};
