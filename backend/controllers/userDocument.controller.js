
import UserDocumentService from "../services/userDocument.services.js";

const userDocumentController = {
    createUserDocument: async (req, res) => {
        try {
            const { is_agreed, DocumentId, UserId } = req.body;      
            const result = await UserDocumentService.createUserDocument(is_agreed, DocumentId, UserId);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        } catch (error) {
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            });
        }
    },

    deleteUserDocumentById: async (req, res) => {
        const { DocumentId, UserId } = req.body;      
        try {
            const result = await UserDocumentService.deleteUserDocumentById(DocumentId, UserId);

            if (result) {
                res.status(200).json({
                    response_code: 200,
                    success: true,
                    message: 'document deleted successfully'
                });

            } else {
                res.status(404).json({
                    response_code: 404,
                    success: false,
                    message: 'document not found'
                });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while deleting document',

            });
        }
    }
}

export default userDocumentController;