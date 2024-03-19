import discountChallengeService from "../services/discountChallenge.services.js";

const discountChallengeController = {
    createDiscountChallenge: async (req, res) => {
        try {
            const { title, end_date, type, target, amount, discount_type, discount_amount } = req.body;
            const result = await discountChallengeService.createDiscountChallenge(title, end_date, type, target, amount, discount_type, discount_amount);
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
                response_code: 500,
                status: false,
                error: error.message
            })
        }
    },
    getAllDiscountChallenges: async (req, res) => {
        try {
            const result = await discountChallengeService.getAllDiscountChallenges();
            res.status(200).json({
                response_code: 200,
                success: true, result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching challenges'
            });
        }
    },
    getDiscountChallengeById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await discountChallengeService.getDiscountChallengeById(id);
            if (!result) {
                res.status(404).json({
                    response_code: 404,
                    success: false, message: 'challenge not found'
                });
            }
            res.status(200).json({
                response_code: 200,
                success: true,
                result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching challenge'
            });
        }
    },

    deleteDiscountChallengeById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await discountChallengeService.deleteDiscountChallengeById(id);

            res.status(200).json(result);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while deleting discount Challenge',

            });
        }
    },
    updateDiscountChallenge: async (req, res) => {
        const { id, title, end_date, type, target, amount, discount_type, discount_amount } = req.body;
        try {
            const result = await discountChallengeService.updateDiscountChallenge(id, title, end_date, type, target, amount, discount_type, discount_amount);
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
                response_code: 500,
                status: false,
                error: error.message
            })
        }
    },
    getValidAllDiscountChallenges: async (req, res) => {
        try {
            
            const result = await discountChallengeService.getValidAllDiscountChallenges();
            res.status(200).json({
                response_code: 200,
                success: true, result
            });

        } catch (error) {
            res.status(500).json({
                response_code: 500,
                success: false, message: error.message
            });
        }
    },
    claimDiscountCode: async (req, res) => {
        try {
            const user_id = req.userId.id;
            const { discount_challenge_id } = req.body;
            const result = await discountChallengeService.claimDiscountCode(user_id, discount_challenge_id);
            res.status(200).json({
                response_code: 200,
                success: true, result
            });

        } catch (error) {
            res.status(500).json({
                response_code: 500,
                success: false, message: error.message
            });
        }
    },

    getValidDiscountChallengesOfUser: async (req, res) => {
        try {
            const user_id = req.userId.id;
            const result = await discountChallengeService.getValidDiscountChallengesOfUser(user_id);
            res.status(200).json({
                response_code: 200,
                success: true, result
            });

        } catch (error) {
            res.status(500).json({
                response_code: 500,
                success: false, message: error.message
            });
        }
    },

}

export default discountChallengeController;