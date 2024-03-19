import express from "express";
const router = express.Router();

import userController from "../controllers/user.controller.js";
import adminAuthentication from "../middleware/adminAuthentication.js";
import userAuthentication from "../middleware/userAuthentication.js";
import multer from 'multer';

// Configure multer to handle file uploads
const upload = multer({dest: '/'});

router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);
router.delete("/deleteUser/:id", userAuthentication,userController.deleteUser);
router.get("/getUser/:id", userController.getUserById);
router.get("/getAllUsersForUser",userAuthentication, userController.getAllUsersForUser);
router.get("/getAllUsersForAdmin",adminAuthentication, userController.getAllUsersForAdmin);
router.post("/ChangeUserPassword/:id", userController.changeUserPassword);
router.put("/updateUser",upload.single('image'), userAuthentication,userController.updateUser);
router.get("/getUserByPage",adminAuthentication,userController.getUserByPage);
router.post("/sendOTP", userController.sendOTP);
router.put("/ChangePasswordWithOtp/:id", userController.ChangePasswordWithOtp);
export default router;
