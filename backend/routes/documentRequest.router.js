import express from "express";
const router = express.Router();

import documentRequest from "../controllers/documentRequest.controller.js"


router.post("/createDocReq" ,documentRequest.createDocumentRequeset);


export default router;
