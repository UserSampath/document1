import { Payments } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const paymentsRepo = {

    createPayment: async (user_id, customerId,paymentIntentId,title,Total,paymentStatus)=>{
        try{
        await sequelize.sync();
        const payment = await Payments.create({
            user_id, customerId,paymentIntentId,title,Total,paymentStatus
        })
        return payment;
    }catch(error){
        throw error;
    }
    },

    getAllPayments : async()=>{
        try{
            const allPayments = await Payments.findAll();
            return allPayments;
        }catch(error){
        throw error;
        }
    },

    getPaymentsById: async (id)=>{
        try{
            const result = await Payments.findOne({
                where: {
                    id: id,
                },
              });
              return result;
        }catch(error){
            throw error;

        }
    },
    getPaymentByUserId: async (id) => {
        try {
            const result = await Payments.findAll({
                where: {
                    user_id: id,
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    }
}

export default paymentsRepo;