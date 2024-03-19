import discountChallengeController from "../controllers/discountChallenge.controller.js";
import userAuthentication from "../middleware/userAuthentication.js";

import express from "express";
const router = express.Router();

router.post("/createDiscountChallenge", discountChallengeController.createDiscountChallenge);
router.get("/getAllDiscountChallenges", discountChallengeController.getAllDiscountChallenges);
router.get("/getDiscountChallengeById/:id", discountChallengeController.getDiscountChallengeById)
router.delete("/deleteDiscountChallengeById/:id", discountChallengeController.deleteDiscountChallengeById)
router.put("/updateDiscountChallenge", discountChallengeController.updateDiscountChallenge)
router.get("/getValidAllDiscountChallenges", discountChallengeController.getValidAllDiscountChallenges)
router.post("/claimDiscountCode", userAuthentication, discountChallengeController.claimDiscountCode)
router.post("/getValidDiscountChallengesOfUser", userAuthentication, discountChallengeController.getValidDiscountChallengesOfUser)









export default router;  