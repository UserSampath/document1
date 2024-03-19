import paymentController from "../controllers/payment.controller.js";
import express from "express";
const router = express.Router();

router.post("/createPayment", paymentController.createPayment);
router.get("/getAllPayments",paymentController.getAllPayments);
router.get("/getPaymentById/:id", paymentController.getPaymentById)
router.get("/getPaymentByUserId/:id", paymentController.getPaymentByUserId)

export default router;  