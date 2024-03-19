import axios from "axios";
import sequelize from "../config/db.connection.js"
import { Discount, User } from "../models/model.js";
import generateRandomNumber from "./../utils/randomNumber.js"
import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
const discountRepo = {
    createDiscountCode: async (type, amount, user_id) => {
        try {
            if (type == "price" && amount != 100 && amount != 200 && amount != 500) {
                throw new Error("Amount should be 100, 200, or 500");
            }
            await sequelize.sync();
            const discount_code = await generateRandomNumber();
            const discount = await Discount.create({
                discount_code,
                is_valid: true,
                type,
                amount,
                user_id
            })
            return discount;
        } catch (error) {
            throw error;
        }
    },
    createDiscountCodeUsingPoints: async (user_id, amount) => {
        try {
            if (amount != 100 && amount != 200 && amount != 500) {
                throw new Error("Amount should be 100, 200, or 500");
            }
            await sequelize.sync();
            const user = await User.findByPk(user_id);

            if (!user) {
                throw new Error("User not found");
            }
            if (user.points < amount) {
                throw new Error("User have not enough points");
            }
           
            const discountCode = await generateRandomNumber();

            const api = new WooCommerceRestApi({
                url: "https://deltamax.fit/",
                consumerKey: "ck_ebf6b43314ca37175104884bd9acd36a4e41d56b",
                consumerSecret: "cs_2968e78dd40b9dbe60196e02d980a0cff225ce3a",
                version: "wc/v3",
            });

            const data = {
                code: discountCode.toString(),
                discount_type: 'fixed_cart',
                amount: amount.toString(),
                individual_use: true,
                description: 'From DeltaMax App',
                usage_limit: 1,
                free_shipping: false,
                usage_limit_per_user: 1,
            };
            const response = await api.post("coupons", data);
            if (response.status == 201) {
                const newPoints = user.points - amount;
                const rowCount = await User.update(
                    { points: newPoints },
                    { where: { id: user_id } }
                );
                if (rowCount <= 0) {
                    throw new Error("User not updated");
                }
                const discount = await Discount.create({
                    discount_code: discountCode,
                    is_valid: true,
                    type: "price",
                    amount,
                    user_id
                })
                return discount;  
            }
            throw new Error("Discount coupon not created")

           
        } catch (error) {
            throw error;
        }
    },

    getDiscountInformation: async (discount_code) => {
        try {
            const discount = await Discount.findOne({
                where: { discount_code },
            });
            if (!discount) {
                throw new Error("Discount not found");
            }
            if (discount.is_valid == false) {
                throw new Error("Discount is already used");
            }
            return {
                discount_code: discount.discount_code,
                amount: discount.amount,
                type: discount.type
            };
        } catch (error) {
            throw error;
        }
    },
    useDiscount: async (discount_code) => {
        try {
            const discount = await Discount.findOne({
                where: { discount_code },
            });
            if (!discount) {
                throw new Error("Discount not found");
            }
            if (discount.is_valid == false) {
                throw new Error("Discount is already used");
            }
            const rowCount = await Discount.update(
                { is_valid: false },
                { where: { discount_code } }
            );
            if (rowCount < 1) {
                throw new Error("Error updating discount");
            }
            const newDiscount = await Discount.findOne({
                where: { discount_code },
            });

            return {
                discount_code: newDiscount.discount_code,
                amount: newDiscount.amount,
                type: newDiscount.type
            };
        } catch (error) {
            throw error;
        }
    },
    getAllDiscountsOfUser: async (user_id) => {
        try {
            const discount = await Discount.findAll({
                where: {
                    user_id,
                    is_valid: true
                },
            });
            return discount;
        } catch (error) {
            throw error;
        }
    },

}
export default discountRepo;