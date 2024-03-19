import discountChallengeRepo from "../repositories/discountChallenge.repo.js";

const discountChallengeService = {

    createDiscountChallenge: async (title, end_date, type, target, amount, discount_type, discount_amount) => {
        try {
            const discountChallenge = await discountChallengeRepo.createDiscountChallenge(title, end_date, type, target, amount, discount_type, discount_amount);
            if (discountChallenge) {
                return { status: true, message: "Discount challenge created successfully", discountChallenge };
            } else {
                return { status: false, message: "Discount challenge created failed!" }

            }
        } catch (error) {
            throw error;
        }
    },
    getAllDiscountChallenges: async () => {
        try {
            const allDiscountChallenges = await discountChallengeRepo.getAllDiscountChallenges();
            return allDiscountChallenges;
        } catch (error) {
            throw error;
        }
    },

    getDiscountChallengeById: async (id) => {
        try {
            const result = await discountChallengeRepo.getDiscountChallengeById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
    deleteDiscountChallengeById: async (id) => {
        try {
            const result = await discountChallengeRepo.deleteDiscountChallengeById(id);
            if (result > 0) {
                return {
                    response_code: 200,
                    success: true,
                    message: 'product deleted successfully'
                }
            }

            return {
                response_code: 404,
                success: false,
                message: 'product not found'
            }


        } catch (error) {
            throw error;
        }
    },
    updateDiscountChallenge: async (id, title, end_date, type, target, amount, discount_type, discount_amount) => {
        try {
            const discountChallenge = await discountChallengeRepo.updateDiscountChallenge(id, title, end_date, type, target, amount, discount_type, discount_amount);
            if (discountChallenge) {
                return {
                    status: true,
                    message: "Discount challenge updated successfully",
                    discountChallenge
                }
            } else {
                return {
                    status: false,
                    message: "Discount challenge not updated",
                }
            }

        } catch (error) {
            throw error;
        }
    },
    getValidAllDiscountChallenges: async () => {
        try {
            const allDiscountChallenges = await discountChallengeRepo.getValidAllDiscountChallenges();
            return allDiscountChallenges;
        } catch (error) {
            throw error;
        }
    },
    claimDiscountCode: async (user_id, discount_challenge_id) => {
        try {
            const result = await discountChallengeRepo.claimDiscountCode(user_id, discount_challenge_id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getValidDiscountChallengesOfUser: async (user_id) => {
        try {
            const result = await discountChallengeRepo.getValidDiscountChallengesOfUser(user_id);
            return result;
        } catch (error) {
            throw error;
        }
    },



}


export default discountChallengeService;