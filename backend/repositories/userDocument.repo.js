import { Document,UserDocument } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const userDocumentRepo = {

    createUserDocument: async (is_agreed, DocumentId, UserId) => {
        try {
            await sequelize.sync();
            const result = await UserDocument.create({ is_agreed, DocumentId, UserId });
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteUserDocumentById: async (DocumentId, UserId) => {
        try {
            const result = await Document.destroy({
                where: {
                    DocumentId,
                    UserId
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default userDocumentRepo;