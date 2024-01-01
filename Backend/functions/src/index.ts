import admin = require("firebase-admin");
import * as functions from "firebase-functions/v2";
import * as productionAccount from "../serviceAccount-Prod.json";
import * as developAccount from "../serviceAccount-Stage.json";
import config from "./config/config";
import {getFirestore} from "firebase-admin/firestore";
import axios from "axios";

const projectId = process.env.GCLOUD_PROJECT;

let serviceAccount;
switch (projectId) {
case "aiba-digital":
  serviceAccount = productionAccount as admin.ServiceAccount;
  break;
case "aiba-digital-stage":
  serviceAccount = developAccount as admin.ServiceAccount;
  break;
default:
  throw new Error(`Unknown projectId ${projectId}`);
}

const credential = admin.credential.cert(serviceAccount);
admin.initializeApp({credential: credential});
functions.setGlobalOptions({region: config.firebase.region});

export const githubWebhook = functions.https.onRequest(async (request, response) => {
  if (request.body.workflow_run.name !== "Submit to TestFlight") {
    response.sendStatus(200);
    return;
  }

  if (request.body.action === "requested") {
    const msg = "程式碼已更新，開始自動打包並上傳測試版本 ☁️";
    await sendLineAlert(msg);
    response.sendStatus(200);
    return;
  }

  if (request.body.action !== "completed") {
    response.sendStatus(200);
    return;
  }

  const appId = config.apple.appId;
  const appLink = `https://beta.itunes.apple.com/v1/app/${appId}`;
  const successMsg = "測試版本上傳成功，快去更新體驗吧~\n" + appLink;
  const failureMsg = "測試版本上傳失敗!\n請聯繫工程師處理";

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
    await sendLineSticker(packageId, stickerId);
    await sendLineAlert(msg);
    response.sendStatus(200);
  } catch (e) {
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

