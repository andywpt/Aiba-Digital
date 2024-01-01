import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

// custom authentications (e.g. LINE) do not trigger blocking functions
export const beforeUserSignedIn = functions.identity.beforeUserSignedIn(async (event) => {
  const user = event.data;
  const eventType = event.eventType;
  if (eventType.includes("phone")) {
    const userRef = admin.firestore().collection("users").doc(user.uid);
    await userRef.update({phone: user.phoneNumber});
    const userClaimsRef = userRef.collection("userClaims").doc(user.uid);
    await userClaimsRef.update({isVerified: true});
    const customClaims = user.customClaims ?? {};
    customClaims.isVerified = true;
    return {customClaims: customClaims};
  }else{
    return {};
  }
});