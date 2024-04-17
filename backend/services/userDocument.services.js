import userDocumentRepo from "../repositories/userDocument.repo.js";
const UserDocumentService = {
    createUserDocument: async (documentIdList, email, type) => {

        try {
            const result = await userDocumentRepo.createUserDocument(documentIdList, email, type);
            if (result) {
                return { status: true, message: "User document created successfully", result }
            } else {
                return { status: false, message: "User document create failed!" }

            }
        } catch (error) {

            throw error;
        }
    },

    respondUserDocument: async (is_agreed, attachment, documentId, userId, firstName, lastName, phone, reference_no) => {

        try {
            const result = await userDocumentRepo.respondUserDocument(is_agreed, attachment, documentId, userId, firstName, lastName, phone, reference_no);
            if (result) {
                return { status: true, message: "User document updated successfully", result }
            } else {
                return { status: false, message: "User document update failed!" }
            }
        } catch (error) {

            throw error;

        }

    },

    deleteUserDocumentById: async (DocumentId, UserId) => {
        try {
            const result = await userDocumentRepo.deleteUserDocumentById(DocumentId, UserId);
            return result > 0;
        } catch (error) {
            throw error;
        }
    },

    getDocumentDataWithUser: async (DocumentId, UserId) => {
        try {
            const result = await userDocumentRepo.getDocumentDataWithUser(DocumentId, UserId);
            return result;
        } catch (error) {
            throw error;
        }
    },

}
export default UserDocumentService;