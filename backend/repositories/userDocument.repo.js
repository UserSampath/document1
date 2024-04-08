import { Document, UserDocument } from "../models/model.js";
import sequelize from "../config/db.connection.js"
import userRepo from "./user.repo.js"
import { where } from "sequelize";

const userDocumentRepo = {

    createUserDocument: async (documentIdList, email) => {
        try {
            await sequelize.sync();
            const userData = await userRepo.findOrCreateUser(email);

            const sentDocuments = [];
            const alreadySentDocuments = [];

            for (const documentId of documentIdList) {
                const isExistingUserDocument = await UserDocument.findOne({
                    where: {
                        DocumentId: documentId,
                        UserId: userData.id
                    }
                });

                if (isExistingUserDocument) {
                    const document = await Document.findByPk(documentId);
                    alreadySentDocuments.push(document);
                    continue;
                }

                const result = await UserDocument.create({ DocumentId: documentId, UserId: userData.id });
                sentDocuments.push(result);
            }

            return { sentDocuments, alreadySentDocuments };
        } catch (error) {
            throw error;
        }
    },

    respondUserDocument: async (is_agreed, attachment, documentId, userId, firstName, lastName, phone, reference_no) => {
        try {
            await userRepo.updateUser(userId, firstName, lastName, phone, reference_no)


            const documentData = await Document.findByPk(documentId);
            if (!documentData) {
                throw new Error("Document not found")
            }
            if (documentData.is_need_attachment && !attachment) {
                throw new Error("Please submit attachment document");
            }

            const data = await UserDocument.findOne({
                where: {
                    DocumentId: documentId,
                    UserId: userId
                }
            })
            if (!data) {
                throw new Error("User document not found");
            }
            if (data.is_agreed) {
                throw new Error("User already submitted document");
            }
            const [rowsAffected] = await UserDocument.update({
                is_agreed,
                attachment
            },
                {where: {
                        DocumentId: documentId,
                        UserId: userId
                    },
                });

            if (rowsAffected) {
                const data = await UserDocument.findOne({
                    where: {
                        DocumentId: documentId,
                        UserId: userId
                    }
                });
                return data;
            }
            return null;
        } catch (error) {
            console.log(error);
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