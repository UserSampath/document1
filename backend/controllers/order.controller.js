
import orderService from "../services/order.services.js";
const orderController = {
    createOrder: async (req, res) => {
        const userId = req.userId.id;
        
        const {orderDetails } = req.body;
        try {

            const result = await orderService.createOrder(userId, orderDetails);
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
    deleteOrder: async (req, res) => {
        const orderId = req.params.orderId;
        try {

            const result = await orderService.deleteOrder(orderId);
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
    getOrderByUserId: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await orderService.getOrderByUserId(id);
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

    getOrderByPage: async (req, res) => {
        try {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>")
            const { page = 1, limit = 3,  productName,date,isAccepted } = req.query;
            const orders = await orderService.getOrderByPage({
                page: +page ? +page : 1,
                limit: +limit ? +limit : 3,
                productName,
                date,
                isAccepted
            });

            res.status(200).json(
                {
                    response_code: 200,
                    success: true,
                    result:orders
                });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching users'
            });
        }
    },
    
}

export default orderController;