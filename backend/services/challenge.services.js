import challengeRepo from "../repositories/challenge.repo.js";

const challengeService = {
    createChallenge: async (created_user_id, challenged_user_id, message, end_date, risk_point_amount, type, amount, premiumEndDate) => {
        try {
            if (premiumEndDate < Date.now()) {
                //TODO: need to put correct amounts
                if (type == "step" && amount>500 ) {
                    return { status: false, message: "free users can not create challenges with more than 500 steps" }
                }
                if (type == "calories" && amount > 500) {
                    return { status: false, message: "free users can not create challenges with more than 500 calories" }
                }
                if (type == "exercise" && amount > 200) {
                    return { status: false, message: "free users can not create challenges with more than 200 minutes" }
                }
            }

            if (created_user_id == challenged_user_id) {
                return { status: false, message: "You can not create challenge for you" }
            }

            const challenge = await challengeRepo.createChallenge(created_user_id, challenged_user_id, message, end_date, risk_point_amount, type, amount);
            if (challenge) {
                return { status: true, message: "Challenge created successfully", challenge }
            }
            else {
                return { status: false, message: "Challenge create failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllChallenges: async () => {
        try {
            const challenges = await challengeRepo.getAllChallenges();
            return {
                status: true,
                message: "Challenges get Successfully",
                challenges
            }
        } catch (error) {
            throw error;
        }
    },

    getOneChallenge: async (challenge_id) => {
        try {
            const challenge = await challengeRepo.getOneChallenge(challenge_id);
            if (!challenge) {
                return { status: false, message: "No any challenge found!" }
            } else {
                return {
                    status: true,
                    message: "Challenge get Successfully",
                    challenge
                }
            }
        } catch (error) {
            throw error;
        }
    },

    getValidAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const challenges = await challengeRepo.getValidAcceptedChallengesOfUser(created_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },

    getValidNotAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const challenges = await challengeRepo.getValidNotAcceptedChallengesOfUser(created_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    getPastAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const challenges = await challengeRepo.getPastAcceptedChallengesOfUser(created_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },

    getPastNotAcceptedChallengesOfUser: async (created_user_id) => {
        try {
            const challenges = await challengeRepo.getPastNotAcceptedChallengesOfUser(created_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    getValidAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const challenges = await challengeRepo.getValidAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    getValidNotAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const challenges = await challengeRepo.getValidNotAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },

    getPastAcceptedReceivedChallengesOfUser: async (challenged_user_id) => {
        try {
            const challenges = await challengeRepo.getPastAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    validAcceptedChallengesOfUser: async (user_id) => {
        try {
            const challenges = await challengeRepo.validAcceptedChallengesOfUser(user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    pastAcceptedChallengesOfUser: async (user_id) => {
        try {
            const challenges = await challengeRepo.pastAcceptedChallengesOfUser(user_id);
            if (challenges.length == 0) {
                return { status: false, message: "No any challenges found!" }
            } else {
                return {
                    status: true,
                    message: "Challenges get Successfully",
                    challenges
                }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteChallenge: async (challengeID) => {
        try {
            const deletedChallenge = await challengeRepo.deleteChallenge(challengeID);
            if (deletedChallenge) {
                return {
                    status: true,
                    message: "Challenge deleted successfully",
                    deletedChallenge
                }
            } else {
                return {
                    status: false,
                    message: "deletion failed"
                }
            }
        } catch (error) {
            throw error;
        }

    },

    updateChallenge: async (challenge_id, message, accepted, end_date, risk_point_amount, type, amount) => {
        try {
            const updatedChallenge = await challengeRepo.updateChallenge(challenge_id, message, accepted, end_date, risk_point_amount, type, amount);
            if (updatedChallenge) {
                return {
                    status: true,
                    message: "Challenge updated successfully",
                    updatedChallenge
                }

            } else {
                return {
                    status: false,
                    message: "Challenge not updated",
                    updatedChallenge
                }
            }
        } catch (error) {
            throw error;
        }


    },
    acceptChallenge: async (challenge_id, userId, premiumEndDate) => {
        try {

            const challengeData = await challengeRepo.getOneChallenge(challenge_id);
            if (premiumEndDate < Date.now()) {
                //TODO: need to put correct amounts
                if (challengeData.type == "step" && challengeData.amount > 500) {
                    return { status: false, message: "free users can not accept challenges with more than 500 steps" }
                }
                if (challengeData.type == "calories" && challengeData.amount > 500) {
                    return { status: false, message: "free users can not accept challenges with more than 500 calories" }
                }
                if (challengeData.type == "exercise" && challengeData.amount > 200) {
                    return { status: false, message: "free users can not accept challenges with more than 200 minutes" }
                }
            }


            const challenge = await challengeRepo.acceptChallenge(challenge_id, userId);
            return { status: true, challenge }
        } catch (error) {
            throw error;
        }
    },
    calculatingWinner: async (challenge_id, userId) => {
        try {
            const winner = await challengeRepo.calculatingWinner(challenge_id, userId);
            if (winner) {
                return winner
            } else {
                return {
                    status: false,
                    message: "getting winner failed"
                }
            }
        } catch (error) {
            throw error;
        }
    },
    challengeFilter: async (challengerId, receiverId, userId, accepted, valid) => {
        try {
            const result = await challengeRepo.challengeFilter(challengerId, receiverId, userId, accepted, valid);
            return result;
               

        } catch (error) {
            throw error;
        }
    }
}

export default challengeService;