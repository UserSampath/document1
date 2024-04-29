import { Document, User, UserDocument } from "../models/model.js";
import sequelize from "../config/db.connection.js"
import userRepo from "./user.repo.js"
import { where } from "sequelize";
import sendEmail from "../config/EmailSend/sendEmail.js";

const userDocumentRepo = {

    createUserDocument: async (documentIdList, email, type) => {
        try {
            await sequelize.sync();
            const userData = await userRepo.createUser(email, type);
            if (userData.status === false) {
                throw new Error(userData.message);
            }

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

            const message = `You have ${sentDocuments.length} documents from COMPANY_NAME.
                http://localhost:5173/userDocuments/${userData.id}
                `


            sendEmail(email, message)

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
                {
                    where: {
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
    },

    getDocumentDataWithUser: async (DocumentId, UserId) => {
      
        try {

            const userDocument = await UserDocument.findOne({
                where: {
                    DocumentId,
                    UserId
                },

            })

            const user = await User.findOne({
                where: {
                    id: UserId
                },

            });

            const document = await Document.findOne({
                where: {
                    id: DocumentId
                },

            })
            return { userDocument, user, document };

        } catch (error) {
            throw error;
        }
    },


    createUserDocumentForExistingUser: async (documentIdList,userId) => {
        try {
            await sequelize.sync();
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error("User not found")
            }

            const sentDocuments = [];
            const alreadySentDocuments = [];

            for (const documentId of documentIdList) {
                const isExistingUserDocument = await UserDocument.findOne({
                    where: {
                        DocumentId: documentId,
                        UserId: userId
                    }
                });

                if (isExistingUserDocument) {
                    const document = await Document.findByPk(documentId);
                    alreadySentDocuments.push(document);
                    continue;
                }

                const result = await UserDocument.create({ DocumentId: documentId, UserId: userId });
                sentDocuments.push(result);
            }

            

            if (sentDocuments.length > 0) {
                const message = `You have ${sentDocuments.length} documents from COMPANY_NAME.
                http://localhost:5173/userDocuments/${userId}
                `
                sendEmail(user.email, message)

            }
              
            return { sentDocuments, alreadySentDocuments };
        } catch (error) {
            throw error;
        }
    },


}

export default userDocumentRepo;