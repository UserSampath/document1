import express from "express";
const router = express.Router();

import userController from "../controllers/user.controller.js";
import adminAuthentication from "../middleware/adminAuthentication.js";
import userAuthentication from "../middleware/userAuthentication.js";
import multer from 'multer';

// Configure multer to handle file uploads
const upload = multer({ dest: '/' });

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUsersByPageAndFilter", userController.getUsersByPageAndFilter);





export default router;
