import * as functions from "firebase-functions/v2"
import express from "express"
const {getAuth} = require("firebase-admin/auth");
const app = express();
const {getFirestore} = require("firebase-admin/firestore");
const {config} = require("./config");
// const {invalid} = require("joi");
const API_PREFIX = "api";
// Rewrite Firebase hosting requests: /api/:path => /:path
const rewritePath = async (req: any, res: any, next: any) => {
  if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
    req.url = req.url.substring(API_PREFIX.length + 1);
  }
  next();
};

const key = config.sfexpress.signKey;

// authentication middleware
const authenticateUser = async (req, res, next) => {
  const idToken = req.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    console.error("Missing Bearer token in the Authorization header.");
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const claims = await getAuth().verifyIdToken(idToken);
    if (!claims.phone_number) {
      throw new Error("Missing Phone Number");
    }
    req.user = claims;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
};

app.use(rewritePath);
const authRouter = express.Router()
app.use("/auth", authRouter)

app.get("/wakeup", (req, res) => {
  res.sendStatus(200);
});

app.post("/user", authenticateUser, (req, res) => {
  res.status(200).send({msg: "Hi User :)"});
});

exports[API_PREFIX] = functions.https.onRequest(app);
