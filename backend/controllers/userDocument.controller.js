
import UserDocumentService from "../services/userDocument.services.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'deqpqbovu',
    api_key: '819577974911333',
    api_secret: 'Dbf4eM17mLT3BLWOHFkeooQ7fmA'
});

const userDocumentController = {
    createUserDocument: async (req, res) => {
        try {
            const { documentIdList, email,type } = req.body;  
          
            const result = await UserDocumentService.createUserDocument(documentIdList, email, type);
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


    respondUserDocument: async (req, res) => {
        try {
            const { is_agreed, documentId, userId, firstName, lastName, phone, reference_no } = req.body;
            const file = req.files && req.files.attachment;
            let data = { secure_url: null };
            if (file) {
                data = await cloudinary.uploader.upload(file.tempFilePath, {
                    public_id: `${Date.now()}`,
                    resource_type: 'auto',
                    folder: "documents",
                })
                if (!data.secure_url) {
                    throw new Error("Cannot upload document")
                }
            }
            const result = await UserDocumentService.respondUserDocument(is_agreed, data.secure_url, documentId, userId, firstName, lastName, phone, reference_no);
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
    },

    getDocumentDataWithUser: async (req, res) => {
        const { DocumentId, UserId } = req.params;
        try {
            const result = await UserDocumentService.getDocumentDataWithUser(DocumentId, UserId);

            if (result) {
                res.status(200).json({
                    response_code: 200,
                    success: true,
                    message: 'get document successfully',
                    result
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
                success: false, message: 'Error occurred while getting document',

            });
        }
    }
}

export default userDocumentController;