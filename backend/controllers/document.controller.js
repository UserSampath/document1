import documentService from "../services/document.services.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'deqpqbovu',
    api_key: '819577974911333',
    api_secret: 'Dbf4eM17mLT3BLWOHFkeooQ7fmA'
});

const documentController = {
    createDocument: async (req, res) => {
        try {
            const { name, type, is_need_attachment } = req.body;
            const file = req.files.pdf;
            const data = await cloudinary.uploader.upload(file.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: 'auto',
                folder: "documents",
            })
            if (!data.secure_url) {
                throw new Error("Cannot upload document")
            }
            const result = await documentService.createDocument(name, data.secure_url, type, is_need_attachment);
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

    getAllDocumentsWithFilter: async (req, res) => {
        try {
            const type = req.params.type;
            const result = await documentService.getAllDocumentsWithFilter(type);
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

    updateDocument: async (req, res) => {
        const { id, name, is_need_attachment, type } = req.body;
        const file = req.files ? req.files.pdf : null;
        var src; // Declare src variable outside the if block
        try {
            if (file) {
                const data = await cloudinary.uploader.upload(file.tempFilePath, {
                    public_id: `${Date.now()}`,
                    resource_type: 'auto',
                    folder: "documents",
                })
                if (!data.secure_url) {
                    throw new Error("Cannot upload document")
                }

                src = data.secure_url;
            }


            const result = await documentService.updateDocument(id, name, src, is_need_attachment, type);
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


    deleteDocumentById: async (req, res) => {
        const id = req.params.id;

        try {
            const isDocumentDelete = await documentService.deleteDocumentById(id);

            if (isDocumentDelete) {
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

    getDocumentById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await documentService.getDocumentById(id);

            if (result.success) {
                res.status(200).json({
                    response_code: 200,
                    result
                });

            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while getting document',

            });
        }
    },


}

export default documentController;