import discountService from "../services/discount.services.js";

const discountController = {
    createDiscountCodeUsingPoints: async (req, res) => {
        try {
            const user_id = req.userId.id;
            const { amount } = req.body;
            const result = await discountService.createDiscountCodeUsingPoints(user_id, amount);
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
    getDiscountInformation: async (req, res) => {
        const discount_code = req.params.discount_code;
        try {
            const result = await discountService.getDiscountInformation(discount_code);
            if (!result) {
                res.status(404).json({
                    response_code: 404,
                    success: false,
                    message: 'discount not found'
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
                success: false,
                message: error.message
            });
        }
    },
    useDiscount: async (req, res) => {
        const discount_code = req.params.discount_code;
        try {
            const result = await discountService.useDiscount(discount_code);
            if (!result) {
                res.status(404).json({
                    response_code: 404,
                    success: false,
                    message: 'discount not found'
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
                success: false,
                message: error.message
            });
        }
    },
    getAllDiscountsOfUser: async (req, res) => {
     const user_id = req.userId.id;
        try {
            const result = await discountService.getAllDiscountsOfUser(user_id);
            res.status(200).json({
                response_code: 200,
                success: true,
                result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false,
                message: error.message
            });
        }
    }

}

export default discountController;