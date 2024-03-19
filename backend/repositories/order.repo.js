import { Products, Order, OrderProduct, User } from "./../models/model.js"
import sequelize from "../config/db.connection.js"
import { Op } from "sequelize";

const OrderRepository = {
    createOrder: async (user_id, orderDetails) => {
        try {
            const order = await Order.create({
                user_id
            });
            for (const { productId, quantity } of orderDetails) {
                // const product = await Products.findByPk(productId);
                await OrderProduct.create({
                    Quantity: quantity,
                    ProductId: productId,
                    OrderId: order.id,
                });
            }
            const orderWithProducts = await Order.findByPk(order.id, {
                include: Products,
            });


            return orderWithProducts;
        } catch (error) {
            throw error;
        }
    },
    deleteOrder: async (orderId) => {
        try {
            const orderToDelete = await Order.findByPk(orderId);

            if (!orderToDelete) {
                return false
            }
            await OrderProduct.destroy({
                where: {
                    OrderId: orderId,
                },
            });

            await orderToDelete.destroy();

            return true;
        } catch (error) {
            throw error;
        }
    },
    getOrderByUserId: async (id) => {
        try {
            const result = await Order.findAll({
                where: {
                    user_id: id,
                },
                include: [{
                    model: Products,
                    through: {
                        model: OrderProduct,
                        attributes: ['Quantity']
                    },
                    attributes: ['id', 'productName', 'price']
                }]
            });
            return result;
        } catch (error) {
            throw error;

        }
    },
    getOrderByPage: async ({ page, limit, productName, date, isAccepted }) => {
        try {
            var productQuery = {};
         
            if (productName) {
                productQuery = {
                    productName: {
                        [Op.eq]: productName
                    }
                }
            }
            var orderQuery = {};
            if (date) {
                const startDate = new Date(date);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1);

                orderQuery = {
                    ...orderQuery,
                    createdAt: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                };
            }
            if (isAccepted == true || isAccepted == false) {
                orderQuery = {
                    ...orderQuery,
                    isAccepted: {
                        [Op.eq]: isAccepted,
                    }
                };
            }
            const queries = {
                offset: (page - 1) * limit,
                limit
            };

            const filteredOrders = await Order.findAndCountAll({
                include: [{
                    model: Products,
                    through: {
                        model: OrderProduct,
                        attributes: ['Quantity']
                    },
                    where: productQuery,
                    attributes: ['id']
                }],
                where: orderQuery,
            });
            const orderIds = filteredOrders.rows.map(order => order.id);
            
            const allOrders = await Order.findAndCountAll({
                where: {
                    id: {
                        [Op.in]: orderIds
                    }
                },
                include: [{
                    model: Products,
                    through: {
                        model: OrderProduct,
                        attributes: ['Quantity']
                    },
                    attributes: ['id', 'productName', 'price']
                }],
                ...queries,
                distinct: true
            });
            return {

                totalPages: Math.ceil(allOrders?.count / limit),
                totalItems: allOrders?.count,
                allOrders
            };
        } catch (error) {
            throw error;
        }
    }
}
export default OrderRepository;