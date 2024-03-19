import sequelize from "../config/db.connection.js"
import { DiscountChallenge, Discount } from "../models/model.js";
import { Op } from "sequelize";
import generateRandomNumber from "./../utils/randomNumber.js"
import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;

const discountChallengeRepo = {
    createDiscountChallenge: async (title, end_date, type, target, amount, discount_type, discount_amount) => {
        try {
            await sequelize.sync();
            const discountChallenge = await DiscountChallenge.create({
                title, end_date, type, target, amount, discount_type, discount_amount
            })
            return discountChallenge;
        } catch (error) {
            throw error;
        }
    },
    getAllDiscountChallenges: async () => {
        try {
            const allDiscountChallenges = await DiscountChallenge.findAll();
            return allDiscountChallenges;
        } catch (error) {
            throw error;
        }
    },
    getDiscountChallengeById: async (id) => {
        try {
            const result = await DiscountChallenge.findOne({
                where: {
                    id: id,
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },
    deleteDiscountChallengeById: async (id) => {
        try {
            const result = await DiscountChallenge.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    },
    updateDiscountChallenge: async (id, title, end_date, type, target, amount, discount_type, discount_amount) => {
        try {
            const updatedRaws = await DiscountChallenge.update({
                title, end_date, type, target, amount, discount_type, discount_amount
            }, { where: { id } });
            if (updatedRaws > 0) {
                const updatedDiscountChallenge = await DiscountChallenge.findByPk(id);
                return updatedDiscountChallenge;
            }
            return;
        } catch (error) {
            throw error;
        }
    },
    getValidAllDiscountChallenges: async () => {
        try {
            const allDiscountChallenges = await DiscountChallenge.findAll({
                where: {
                    end_date: {
                        [Op.gt]: new Date()
                    }
                }
            });
            return allDiscountChallenges;
        } catch (error) {
            throw error;
        }
    },
    claimDiscountCode: async (user_id, discount_challenge_id) => {
        try {
            const discountChallenge = await DiscountChallenge.findOne({
                where: {
                    id: discount_challenge_id,
                },
            });

            if (!discountChallenge) {
                throw new Error("Challenge not found")
            }
            //TODO: check user data whether he win the challenge or not

            const discountWithSameDiscountIdAndUser = await Discount.findAll({
                where: {
                    user_id,
                    discount_challenge_id
                }
            })
            if (discountWithSameDiscountIdAndUser.length > 0) {
                throw new Error("discount is already claimed");
            }
            //TODO: need put correct discount amount
            if (discountChallenge.type == "price" && discountChallenge.discount_amount != 100 && discountChallenge.discount_amount != 200 && discountChallenge.discount_amount != 500) {
                throw new Error("Amount should be 100, 200, or 500");
            }
            const discount_code = await generateRandomNumber();


            const api = new WooCommerceRestApi({
                url: "https://deltamax.fit/",
                consumerKey: "ck_ebf6b43314ca37175104884bd9acd36a4e41d56b",
                consumerSecret: "cs_2968e78dd40b9dbe60196e02d980a0cff225ce3a",
                version: "wc/v3",
            });
            var data = {};
            if (discountChallenge.type == "price") {
                 data = {
                    code: discount_code.toString(),
                    discount_type: 'fixed_cart',
                    amount: discountChallenge.discount_amount.toString(),
                    individual_use: true,
                    description: 'From DeltaMax App',
                    usage_limit: 1,
                    free_shipping: false,
                    usage_limit_per_user: 1,
                };
            } else {
                data = {
                    code: discount_code.toString(),
                    discount_type: 'fixed_cart',
                    amount:"0",
                    individual_use: true,
                    description: 'From DeltaMax App',
                    usage_limit: 1,
                    free_shipping: true,
                    usage_limit_per_user: 1,
                };
            }
           
            const response = await api.post("coupons", data);
            if (response.status == 201) {
                const discount = await Discount.create({
                    discount_code: discount_code,
                    is_valid: true,
                    type: discountChallenge.discount_type,
                    amount: discountChallenge.amount,
                    user_id,
                    discount_challenge_id
                })
                return discount;
            } else {
                throw new Error("Discount creation failed")
             }
           
        } catch (error) {
            throw error;
        }
    },

    getValidDiscountChallengesOfUser: async (user_id) => {
        try {
            const allDiscountChallenges = await DiscountChallenge.findAll({
                where: {
                    end_date: {
                        [Op.gt]: new Date()
                    }
                },

            });
            const discounts = await Discount.findAll({
                where: {
                    user_id,
                    discount_challenge_id: { [Op.not]: null }
                },
            });
            const discountChallengeIds = discounts.map(discount => discount.discount_challenge_id);

            const discount_challengesWithDiscount = allDiscountChallenges.map((discountChallenge) => {
                if (discountChallengeIds.includes(discountChallenge.id)) {
                    return {
                        ...discountChallenge,
                        discount_Collected: true
                    }
                }
                return {
                    ...discountChallenge,
                    discount_Collected: false
                }

            })
            const filteredDiscountChallengesWithDiscount = discount_challengesWithDiscount.map((item) => {
                return {
                    item: item.dataValues,
                    discount_Collected: item.discount_Collected

                }
            })
            return filteredDiscountChallengesWithDiscount;

        } catch (error) {
            throw error;
        }
    },
}
export default discountChallengeRepo;