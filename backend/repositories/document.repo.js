import { DocumentType } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const documentRepo = {

    createDocument: async (name, src) => {
        try {
            await sequelize.sync();
            const result = await DocumentType.create({ name, src });
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllDocuments: async () => {
        try {
            const result = await DocumentType.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    },
    getDocumentById: async (id) => {
        try {
            const result = await DocumentType.findOne({
                where: {
                    id
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },
    updateDocument: async (name, src) => {
        try {
            const updatedRaws = await DocumentType.update({
                src
            }, { where: { name } });
            if (updatedRaws > 0) {
                const result = await DocumentType.findOne({
                    where:{name}
                });
                return result;
            }
        } catch (error) {
            throw error;
        }
    },
    deleteDocumentById: async (id) => {
        try {
            const result = await DocumentType.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    },
    getDocumentByName: async (name) => {
        try {
            const result = await DocumentType.findOne({
                where: {
                    name
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },

}

export default documentRepo;