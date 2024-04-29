import userDocumentController from "../controllers/userDocument.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";

const router = express.Router();


router.post("/createUserDocument", userDocumentController.createUserDocument);
router.post("/respondUserDocument", userDocumentController.respondUserDocument);
router.put("/deleteUserDocumentById", userDocumentController.deleteUserDocumentById);
router.get("/getDocumentDataWithUser/:DocumentId/:UserId", userDocumentController.getDocumentDataWithUser);
router.post("/createUserDocumentForExistingUser", userDocumentController.createUserDocumentForExistingUser);








export default router;  