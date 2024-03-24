import express from "express";
const router = express.Router();

import documentRequest from "../controllers/documentRequest.controller.js"


router.post("/createDocReq" ,documentRequest.createDocumentRequeset);
router.get("/getAllReqDoc",documentRequest.getAllDocumentRequeset);
router.get("/getByID/:id",documentRequest.getDocumentRequestById);
router.delete("/deleteDoc/:id",documentRequest.deleteDocumentReq)


export default router;
