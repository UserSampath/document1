import documentController from "../controllers/document.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";
import multer from 'multer';

// Configure multer to handle file uploads
const upload = multer({ dest: '/' });
const router = express.Router();


router.post("/createDocument", documentController.createDocument);
router.get("/getAllDocuments", documentController.getAllDocuments);
router.get("/getDocumentById", documentController.getDocumentById);
router.put("/updateDocument", documentController.updateDocument);

router.get("/getDocumentByName/:name", documentController.getDocumentByName);

router.put("/updateDocument", documentController.updateDocument);




export default router;  