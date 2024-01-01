import * as functions from "firebase-functions/v2";


export const beforeUserCreated = functions.identity.beforeUserCreated(async (event) => {
  const eventType = event.eventType;
  // Block sign-in methods other than Apple or Google Sign-In
  if (!eventType.includes("apple.com") && !eventType.includes("google.com")) {
    throw new functions.https.HttpsError(
      "already-exists", 
      "目前僅支援Apple、Google、LINE登入"
    );
  }
})