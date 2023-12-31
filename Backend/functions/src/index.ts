import admin = require("firebase-admin");
import * as functions from "firebase-functions/v2";
import * as productionAccount from "../serviceAccount-Prod.json";
import * as developAccount from "../serviceAccount-Dev.json";
import config from "./config";
import {getFirestore} from "firebase-admin/firestore";
import axios from "axios";

const projectId = process.env.GCLOUD_PROJECT;

let serviceAccount;
switch (projectId) {
case "aiba-digital":
  serviceAccount = productionAccount as admin.ServiceAccount;
  break;
case "aiba-digital-dev":
  serviceAccount = developAccount as admin.ServiceAccount;
  break;
default:
  throw new Error(`Unknown projectId ${projectId}`);
}

const credential = admin.credential.cert(serviceAccount);
admin.initializeApp({credential: credential});
functions.setGlobalOptions({region: "asia-east1"});

export const githubWebhook = functions.https.onRequest(async (request, response) => {
  if (request.body.action !== "completed") {
    response.sendStatus(200);
    return;
  }

  const appId = config.apple.appId;
  const appLink = `https://beta.itunes.apple.com/v1/app/${appId}`;
  const successMsg = "最新App測試版本出爐囉，快去更新體驗吧!\n" + appLink;
  const failureMsg = "App測試版本上傳失敗，請聯繫工程師處理";

  const success = request.body.workflow_run.conclusion === "success";
  const msg = success ? successMsg : failureMsg;
  const packageId = success ? "11537" : "446";
  const stickerId = success ? "52002768" : "2024";

  try {
    const date = Date.now().toString();
    await getFirestore()
      .collection("github")
      .doc(date)
      .set({
        body: request.body,
      });
    response.sendStatus(200);
  } catch (e) {
    await sendLineSticker(packageId, stickerId);
    await sendLineAlert(msg);
    response.status(400).send((e as Error).message);
  }
});

const channelAccessToken = config.line.channelAccessToken;
async function sendLineAlert(text: string) {
  if (typeof text !== "string") {
    throw new Error("message is not a string");
  }
  const url = "https://api.line.me/v2/bot/message/broadcast";
  const message = {"type": "text", "text": text};
  const data = {messages: [message]};
  const options = {
    headers: {
      "Authorization": `Bearer ${channelAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  await axios.post(url, data, options);
}

async function sendLineSticker(packageId: string, stickerId: string) {
  const url = "https://api.line.me/v2/bot/message/broadcast";
  const message = {
    "type": "sticker",
    "packageId": packageId,
    "stickerId": stickerId,
  };
  const data = {messages: [message]};
  const options = {
    headers: {
      "Authorization": `Bearer ${channelAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  await axios.post(url, data, options);
}

