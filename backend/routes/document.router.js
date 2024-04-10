import documentController from "../controllers/document.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";
import multer from 'multer';

const upload = multer({ dest: '/' });
const router = express.Router();


router.post("/createDocument", documentController.createDocument);
router.get("/getAllDocumentsWithFilter/:type", documentController.getAllDocumentsWithFilter);
router.put("/updateDocument", documentController.updateDocument);
router.delete("/deleteDocumentById/:id", documentController.deleteDocumentById);


export default router;  