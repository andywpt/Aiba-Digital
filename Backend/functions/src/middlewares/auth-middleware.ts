import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    console.error("Missing Bearer token in the Authorization header.");
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedIdToken.phone_number) {
      throw new Error("Missing Phone Number");
    }
    
    req.idToken = decodedIdToken
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
};