import paymentsRepo from "../repositories/payment.repo.js";

const paymentService ={

    createPayment: async (user_id, customerId,paymentIntentId,title,Total,paymentStatus)=>{
        try{
            const payment = await paymentsRepo.createPayment(user_id, customerId,paymentIntentId,title,Total,paymentStatus);
            if(payment){
                return {status:true,message : "Payment created successfully",payment};
            }else{
                return { status: false, message: "payment create failed!" }

            }
        }catch(error){
            throw error;
        }
    },

    getAllPayments :async ()=>{
        try{
            const allPayments = await paymentsRepo.getAllPayments();
            return allPayments;
        }catch(error){
            throw error;
        }
    },

    getPaymentById: async (id)=>{
        try{
            const payment = await paymentsRepo.getPaymentsById(id);
            return payment;
        }catch(error){
            throw error;
        }
    },
    getPaymentByUserId: async (id) => {
        try {
            const payment = await paymentsRepo.getPaymentByUserId(id);
            return payment;
        } catch (error) {
            throw error;
        }
    }
}


export default paymentService;