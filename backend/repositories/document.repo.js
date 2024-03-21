import { Document } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const documentRepo = {

    createDocument: async (name, src) => {
        try {
            await sequelize.sync();
            const result = await Document.create({ name,src});
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllDocuments: async () => {
        try {
            const result = await Products.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    },
    getDocumentById: async (id) => {
        try {
            const result = await Document.findOne({
                where: {
                    id
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },
    updateDocument: async (id, name) => {
        try {
            const updatedRaws = await Document.update({
                name
            }, { where: { id} });
            if (updatedRaws > 0) {
                const result = await Document.findByPk(id);
                return result;
            }
        } catch (error) {
            throw error;
        }
    },
    deleteDocumentById: async (id) => {
        try {
            const result = await Document.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default documentRepo;