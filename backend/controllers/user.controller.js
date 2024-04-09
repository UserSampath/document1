import userService from "../services/user.services.js";

const userController = {

    createUser: async (req, res) => {
        try {
            const { email,type } = req.body;
            const result = await userService.createUser(email, type);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        } catch (error) {
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            });
        }
    },


    getAllUsers: async (req, res) => {
        try {

            const result = await userService.getAllUsers();
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

    getUsersByPageAndFilter: async (req, res) => {
        try {
            const { page = 1, limit = 3, orderBy = 'email', sortBy = 'asc', keyword, type } = req.query;


            const users = await userService.getUsersByPageAndFilter({
                page: +page ? +page : 1,
                limit: +limit ? +limit : 3,
                orderBy,
                sortBy,
                keyword,
                type
            });

            res.status(200).json(
                {
                    response_code: 200,
                    success: true,
                    users
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

export default userController;