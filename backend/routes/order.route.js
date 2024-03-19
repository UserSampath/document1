import express from "express";
const router = express.Router();
import orderController from "../controllers/order.controller.js";
import adminAuthentication from "../middleware/adminAuthentication.js";
import userAuthentication from "../middleware/userAuthentication.js";

router.post("/create", userAuthentication, orderController.createOrder);
router.delete("/delete/:orderId", orderController.deleteOrder);
router.get("/getOrderByUserId/:id", orderController.getOrderByUserId);
router.get("/getOrderByPage", orderController.getOrderByPage);



export default router;  