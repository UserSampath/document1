import userDocumentRepo from "../repositories/userDocument.repo.js";
const UserDocumentService = {
    createUserDocument: async (is_agreed, DocumentId, UserId) => {

        try {
            const result = await userDocumentRepo.createUserDocument(is_agreed, DocumentId, UserId);
            if (result) {
                return { status: true, message: "User document created successfully", result }
            } else {
                return { status: false, message: "User document create failed!" }

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

}
export default UserDocumentService;