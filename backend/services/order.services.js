import OrderRepo from "./../repositories/order.repo.js"


const orderService = {
    createOrder: async (user_id, orderDetails) => {
        try {
            const order = await OrderRepo.createOrder(user_id, orderDetails);
            if (order) {
                return { status: true, message: "Order created successfully", order }
            }
            else {
                return { status: false, message: "Order create failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteOrder: async (orderId) => {
        try {
            const result = await OrderRepo.deleteOrder(orderId);
            if (result) {
                return { status: true, message: "Order deleted successfully" }
            }
            else {
                return { status: false, message: "Order not found!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getOrderByUserId: async (id) => {
        try {
            const result = await OrderRepo.getOrderByUserId(id);
            if (result) {
                return { status: true, message: "Order getting successfully", result }
            }
            else {
                return { status: false, message: "No any order found!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getOrderByPage: async ({ page, limit, productName, date, isAccepted }) => {
        try {
            const allUsers = await OrderRepo.getOrderByPage({ page, limit, productName, date, isAccepted });
            return allUsers;
        } catch (error) {
            throw error;
        }
    },

}


export default orderService;