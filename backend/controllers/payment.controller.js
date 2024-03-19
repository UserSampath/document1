import paymentService from "../services/payment.services.js";

const paymentController = {
    createPayment : async (req,res)=>{
        try{
            const { user_id,customerId,paymentIntentId,title,Total,paymentStatus} = req.body;
            const result = await paymentService.createPayment(user_id,customerId,paymentIntentId,title,Total,paymentStatus);
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
        }catch(error){
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            })
        }
    },

    getAllPayments:async (req,res)=>{
        try{
            const allPayments = await paymentService.getAllPayments();
            res.status(200).json({ 
                response_code: 200,
                success: true, payments: allPayments });

        }catch(error){
            console.error(error);
            res.status(500).json({  
                response_code: 500,
                success: false, message: 'Error occurred while fetching payment' });
        }
    },

    getPaymentById : async (req, res)=>{
        const id = req.params.id;

        try{
            const payment = await paymentService.getPaymentById(id);
            if(!payment	){
                res.status(404).json({ 
                    response_code: 404,
                    success: false, message: 'Payment not found' });
                return;
            }
            res.status(200).json({
                 response_code: 200,
                success: true, payment });

        }catch(error){
            console.error(error);
            res.status(500).json({ response_code: 500,
                success: false, message: 'Error occurred while fetching user' });
        }
    },
    getPaymentByUserId: async (req, res) => {
        const id = req.params.id;

        try {
            const payment = await paymentService.getPaymentByUserId(id);
            if (!payment) {
                res.status(404).json({ 
                    response_code: 404,
                    success: false, message: 'Payment not found' });
                return;
            }
            res.status(200).json({ 
                response_code: 200,
                success: true, payment });

        } catch (error) {
            console.error(error);
            res.status(500).json({ response_code: 500,
                success: false, message: 'Error occurred while fetching user' });
        }
    }
}

export default paymentController;