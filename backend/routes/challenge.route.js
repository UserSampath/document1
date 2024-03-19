import challengeController from "../controllers/challenge.controller.js";
import express from "express";
const router = express.Router();
import userAuthentication from "../middleware/userAuthentication.js";

router.post("/create", userAuthentication, challengeController.createChallenge);
router.get("/all", challengeController.getAllChallenges);
router.get("/one/:challenge_id", challengeController.getOneChallenge);
router.delete("/deleteOne/:challenge_id", challengeController.deleteChallenge);
router.put("/update", challengeController.updateChallenge);

router.get("/getValidAcceptedChallengesOfUser/:created_user_id", challengeController.getValidAcceptedChallengesOfUser);
router.get("/getValidNotAcceptedChallengesOfUser/:created_user_id", challengeController.getValidNotAcceptedChallengesOfUser);
router.get("/getPastAcceptedChallengesOfUser/:created_user_id", challengeController.getPastAcceptedChallengesOfUser);
router.get("/getPastNotAcceptedChallengesOfUser/:created_user_id", challengeController.getPastNotAcceptedChallengesOfUser);

router.get("/getValidAcceptedReceivedChallengesOfUser/:challenged_user_id", challengeController.getValidAcceptedReceivedChallengesOfUser);
router.get("/getValidNotAcceptedReceivedChallengesOfUser/:challenged_user_id", challengeController.getValidNotAcceptedReceivedChallengesOfUser);
router.get("/getPastAcceptedReceivedChallengesOfUser/:challenged_user_id", challengeController.getPastAcceptedReceivedChallengesOfUser);

router.get("/validAcceptedChallengesOfUser/:user_id", challengeController.validAcceptedChallengesOfUser);
router.get("/pastAcceptedChallengesOfUser/:user_id", challengeController.pastAcceptedChallengesOfUser);

router.post("/acceptChallenge", userAuthentication, challengeController.acceptChallenge);
router.post("/calculatingWinner", userAuthentication, challengeController.calculatingWinner);

router.post("/challengeFilter", challengeController.challengeFilter);










export default router;  