import { Document } from "../models/model.js";
import sequelize from "../config/db.connection.js"

const documentRepo = {

    createDocument: async (name, src, type, is_need_attachment) => {
        try {
            await sequelize.sync();
            const result = await Document.create({ name, src, type, is_need_attachment });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllDocumentsWithFilter: async (type) => {
        try {
            let query = {};
            if (type == "all") {
                query = {};
            } else if (type) {
                query.type = type;
            }

            if (type !== "all" && (type !== "employee") && (type !== "nonEmployee")) {
                throw new Error("Enter valid type");
            }

            const result = await Document.findAll({
                where: query,
            });

            return result;
        } catch (error) {
            throw error;
        }
    },

    updateDocument: async (id, name, src, is_need_attachment, type) => {
        try {
            console.log(id, name, is_need_attachment, type);

            const document = await Document.findByPk(id);
            if (!document) {
                throw new Error("Document not found");
            }
           await Document.update({
                name, src, is_need_attachment, type
            }, { where: { id } });
            const result = await Document.findOne({
                where: { id }
            });
            return result;

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
    },

}

export default documentRepo;