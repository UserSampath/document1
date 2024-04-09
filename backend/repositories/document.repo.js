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


    // getAllDocuments: async () => {
    //     try {
    //         const result = await Document.findAll();
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getDocumentById: async (id) => {
    //     try {
    //         const result = await Document.findOne({
    //             where: {
    //                 id
    //             },
    //         });
    //         return result;
    //     } catch (error) {
    //         throw error;

    //     }
    // },
    // updateDocument: async (name, src) => {
    //     try {
    //         const updatedRaws = await Document.update({
    //             src
    //         }, { where: { name } });
    //         if (updatedRaws > 0) {
    //             const result = await Document.findOne({
    //                 where:{name}
    //             });
    //             return result;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // deleteDocumentById: async (id) => {
    //     try {
    //         const result = await Document.destroy({
    //             where: {
    //                 id
    //             }
    //         })
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getDocumentByName: async (name) => {
    //     try {
    //         const result = await Document.findOne({
    //             where: {
    //                 name
    //             },
    //         });
    //         return result;
    //     } catch (error) {
    //         throw error;

    //     }
    // },

}

export default documentRepo;