import discountRepo from "../repositories/discount.repo.js";

const discountService = {

    createDiscountCodeUsingPoints: async (user_id, amount) => {
        try {
            const discountChallenge = await discountRepo.createDiscountCodeUsingPoints(user_id, amount);
            if (discountChallenge) {
                return { status: true, message: "Discount created successfully", discountChallenge };
            } else {
                return { status: false, message: "Discount created failed!" }

            }
        } catch (error) {
            throw error;
        }
    },
    getDiscountInformation: async (discount_code) => {
        try {
            const result = await discountRepo.getDiscountInformation(discount_code);
            if (result) {
                return {
                    status: true, message: "Get discount information successfully",
                    result
                };
            } else {
                return { status: false, message: "Get discount information failed" }
            }
        } catch (error) {
            throw error;
        }
    },
    useDiscount: async (discount_code) => {
        try {
            const result = await discountRepo.useDiscount(discount_code);
            if (result) {
                return {
                    status: true, message: "Use discount successfully",
                    result
                };
            } else {
                return { status: false, message: "Use discount failed" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllDiscountsOfUser: async (user_id) => {
        try {
            const result = await discountRepo.getAllDiscountsOfUser(user_id);
            return {
                result,
                status: true,
            }
            
        } catch (error) {
            throw error;
        }
    }

}


export default discountService;