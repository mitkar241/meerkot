#!/usr/bin/env node

const homedir = `${__dirname}/..`
const { app } = require(`${homedir}/app.js`);
const { config } = require(`${homedir}/utils/config.js`);
const { logger } = require(`${homedir}/utils/logger.js`);
const { model } = require(`${homedir}/utils/model.js`);

class Slack {

    /*
    # N.B. "user" is reqd only for ephemeral messages
    payloadObj = {
        "channel": "",
        "thread_ts" : "",
        "user": "",
        "text" : "",
        "attachments" : "",
        "blocks": "",
    }
    */
    parsePayload(type, payloadObj) {
        try {
            let postObj = {
                token: config.bot.access_token,
            }
            if ("channel" in payloadObj == false){
                // fatal error
                return {}
            }
            postObj["channel"] = payloadObj["channel"]
            if ("thread_ts" in payloadObj == true){
                postObj["thread_ts"] = payloadObj["thread_ts"]
            }
            if (type === "ephemeral") {
                if ("user" in payloadObj === false){
                    // fatal error
                    return {}
                } else {
                    postObj["user"] = payloadObj["user"]
                }
            }
            if ("text" in payloadObj == false){
                // warn error
                postObj["text"] = ""
            } else {
                postObj["text"] = payloadObj["text"]
            }
            // attachments and blocks are allowed mutually exclusively
            if ("attachments" in payloadObj == true){
                postObj["attachments"] = payloadObj["attachments"]
            } else if ("blocks" in payloadObj == true){
                postObj["blocks"] = payloadObj["blocks"]
            }
            return postObj;
        }
        catch (error) {
            console.error(error);
            return {};
        }
    }

    postMessage(payloadObj) {
        try {
            let postObj = this.parsePayload("message", payloadObj);
            if (postObj === {}) {
                // error tookplace
                return
            }
            const result = app.client.chat.postMessage(postObj);
        }
        catch (error) {
            console.error(error);
        }
    }

    postEphemeral(payloadObj) {
        try {
            let postObj = this.parsePayload("ephemeral", payloadObj);
            if (postObj === {}) {
                // error tookplace
                return
            }
            const result = app.client.chat.postEphemeral(postObj);
        }
        catch (error) {
            console.error(error);
        }
    }

    /*
    https://api.slack.com/methods/files.upload
    https://api.slack.com/types/file#file_types
    */
    fileupload(fileObj) {
        try {
        // Call the files.upload method using the WebClient
        const result = app.client.files.upload({
            
            // If you want to put more than one channel, separate using comma, example: 'general,random'
            channels: fileObj.channels,
    
            // Upload file in a thread
            thread_ts: fileObj.thread_ts,
    
            // comment in the same message
            initial_comment: fileObj.initial_comment,
            
            // title of the file while downloading
            title: fileObj.title,
    
            // filename once downloaded
            filename: fileObj.filename,
    
            // provide file type
            fileType: fileObj.fileType,
    
            // via multipart/form-data. If omitting this parameter, you MUST submit content
            file: fs.createReadStream(fileObj.filePath)
    
        });
        //console.log(result);
        }
        catch (error) {
        console.error(error);
        }
    }

    addRxn(chanId, tstamp, emoji) {
        try {
          const result = app.client.reactions.add({
            name: emoji,
            channel: chanId,
            timestamp: tstamp
          });
        }
        catch (error) {
          console.error(error);
        }
      }
      
      removeRxn(chanId, tstamp, emoji) {
        try {
          const result = app.client.reactions.remove({
            name: emoji,
            channel: chanId,
            timestamp: tstamp
          });
        }
        catch (error) {
          console.error(error);
        }
      }

}

let slack = new Slack();

module.exports = {
    slack: slack
};
