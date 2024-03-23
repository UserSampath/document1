import userDocumentController from "../controllers/userDocument.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";

const router = express.Router();


router.post("/createUserDocument", adminAuthentication, userDocumentController.createUserDocument);
router.put("/deleteUserDocumentById", userDocumentController.deleteUserDocumentById);




export default router;  