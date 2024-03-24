import { documentRequest } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const documentRequestRepo = {

    createDocumentRequest: async (email, employeeStatus,is_agreed) => {
        try {
            await sequelize.sync();
            const result = await documentRequest.create({ email, employeeStatus,is_agreed});
            return result;
        } catch (error) {
            throw error;
        }
    },
}

export default documentRequestRepo;