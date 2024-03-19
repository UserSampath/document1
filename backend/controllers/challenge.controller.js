import challengeService from "../services/challenge.services.js";

const challengeController = {
    createChallenge: async (req, res) => {
        try {
            const user = req.userId.id;
            const premiumEndDate = req.userId.premiumEndDate;
            const { challenged_user_id, message, end_date, risk_point_amount, type, amount } = req.body;
            const result = await challengeService.createChallenge(user, challenged_user_id, message, end_date, risk_point_amount, type, amount, premiumEndDate);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getAllChallenges: async (req, res) => {
        try {
            const result = await challengeService.getAllChallenges();
            res.status(200).json({
                response_code: 200,
                result
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getOneChallenge: async (req, res) => {
        const challenge_id = req.params.challenge_id;
        try {
            const result = await challengeService.getOneChallenge(challenge_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getValidAcceptedChallengesOfUser: async (req, res) => {
        const created_user_id = req.params.created_user_id;
        try {
            const result = await challengeService.getValidAcceptedChallengesOfUser(created_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

    getValidNotAcceptedChallengesOfUser: async (req, res) => {
        const created_user_id = req.params.created_user_id;
        try {
            const result = await challengeService.getValidNotAcceptedChallengesOfUser(created_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getPastAcceptedChallengesOfUser: async (req, res) => {
        const created_user_id = req.params.created_user_id;
        try {
            const result = await challengeService.getPastAcceptedChallengesOfUser(created_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

    getPastNotAcceptedChallengesOfUser: async (req, res) => {
        const created_user_id = req.params.created_user_id;
        try {
            const result = await challengeService.getPastNotAcceptedChallengesOfUser(created_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getValidAcceptedReceivedChallengesOfUser: async (req, res) => {
        const challenged_user_id = req.params.challenged_user_id;
        try {
            const result = await challengeService.getValidAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getValidNotAcceptedReceivedChallengesOfUser: async (req, res) => {
        const challenged_user_id = req.params.challenged_user_id;
        try {
            const result = await challengeService.getValidNotAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getPastAcceptedReceivedChallengesOfUser: async (req, res) => {
        const challenged_user_id = req.params.challenged_user_id;
        try {
            const result = await challengeService.getPastAcceptedReceivedChallengesOfUser(challenged_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    validAcceptedChallengesOfUser: async (req, res) => {
        const user_id = req.params.user_id;
        try {
            const result = await challengeService.validAcceptedChallengesOfUser(user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

    pastAcceptedChallengesOfUser: async (req, res) => {
        const user_id = req.params.user_id;
        try {
            const result = await challengeService.pastAcceptedChallengesOfUser(user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },


    deleteChallenge: async (req, res) => {
        const challengeID = req.params.challenge_id;
        try {
            const result = await challengeService.deleteChallenge(challengeID);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    updateChallenge: async (req, res) => {
        const { challenge_id, message, accepted, end_date, risk_point_amount, type, amount } = req.body;
        try {
            const result = await challengeService.updateChallenge(challenge_id, message, accepted, end_date, risk_point_amount, type, amount);
            if (result) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    acceptChallenge: async (req, res) => {
        const { challenge_id } = req.body;
        const user = req.userId;
        const premiumEndDate = req.userId.premiumEndDate;
        try {
            const result = await challengeService.acceptChallenge(challenge_id, user.id, premiumEndDate);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(500).json({
                    response_code: 500,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    calculatingWinner: async (req, res) => {
        const { challenge_id } = req.body;
        const user = req.userId;
        try {
            const result = await challengeService.calculatingWinner(challenge_id, user.id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    challengeFilter: async (req, res) => {
        const { challengerId, receiverId, userId, accepted, valid } = req.body;
        try {
            const result = await challengeService.challengeFilter(challengerId, receiverId, userId, accepted, valid);
            res.status(200).json({
                response_code: 200,
                status: true,
                result,
                
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
}

export default challengeController;