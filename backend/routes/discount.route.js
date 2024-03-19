import discountController from "../controllers/discount.controller.js";
import userAuthentication from "../middleware/userAuthentication.js";
import createDiscount from "./../middleware/createDiscount.js"

import express from "express";
const router = express.Router();

router.post("/createDiscountCodeUsingPoints", userAuthentication, discountController.createDiscountCodeUsingPoints);
router.get("/getDiscountInformation/:discount_code", discountController.getDiscountInformation);
router.put("/useDiscount/:discount_code", discountController.useDiscount);
router.get("/getAllDiscountsOfUser", userAuthentication, discountController.getAllDiscountsOfUser);
router.post("/createDiscount", createDiscount);






export default router;  