import express from "express";
const router = express.Router();
import sendPushNotification from "../middleware/sendPushNotification.js";

router.post("/sendPushNotification", sendPushNotification);

export default router;  