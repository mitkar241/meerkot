#!/usr/bin/env node

class Model {

  /*
  ISSUE:
  [WARN]  bolt-app The `text` argument is missing in the request payload for a chat.postMessage call - It's a best practice to always provide a `text` argument when posting a message. The `text` is used in places where the content cannot be rendered such as: system push notifications, assistive technology such as screen readers, etc.
  fixed by adding fallback text and making format:
  {"channel": channelID, "text": textText, "blocks": []}
  instead of minimal:
  {"blocks": []}
  */
  TextButton(channelID, textText, buttonText, buttonValue, buttonActionId) {
      let textButton = {
        "channel": channelID,
        "text": textText,
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": textText
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": buttonText,
                "emoji": true
              },
              "value": buttonValue,
              "action_id": buttonActionId
            }
          }
        ]
      }
      return textButton
  }

  TextButtonThread(channelID, textText, buttonText, buttonValue, buttonActionId, threadTs) {
    let textButton = this.TextButton(channelID, textText, buttonText, buttonValue, buttonActionId)
    textButton["thread_ts"] = threadTs
    return textButton
  }

  TextAttachment(pretext, text) {
    let textAttach = {
      "response_type": "in_channel",
      "text": pretext,
      "attachments": 
      [
        {
          "text": text,
          "mrkdwn_in": ["text", "pretext"]
        }
      ]
    };
    return textAttach;
  }

  postMessageIm(channelId, userId) {
    let userToken = config.bot.access_token
    try {
      const result = app.client.chat.postMessage({
        channel: channelId,
        token: userToken,
        text: `Thanks for using meernote <@${userId}>! @meerkot is here to help you.`
      });
    }
    catch (error) {
      console.error(error);
    }
  }

}

let model = new Model();

module.exports = {
    model: model
};
