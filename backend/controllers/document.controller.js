import { v2 as cloudinary } from 'cloudinary';
import documentService from "../services/document.services.js";
// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dcif58he2',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
}


const documentController = {
    createDocument: async (req, res) => {
        try {
            const { name, src } = req.body;
            console.log(req.body)
            // Check if file is provided in the form data
            if (!req) {
                return res.status(400).json({
                    response_code: 400,
                    status: false,
                    error: "File is required"
                });
            }

            // Upload image to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, opts);

            // Extract secure URL of the uploaded image from Cloudinary response
            const imageUrl = cloudinaryResponse.secure_url;

            // Create product with imageUrl
            const result = await documentService.createDocument(name, src);
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
    getAllDocuments: async (req, res) => {
        try {

            const result = await documentService.getAllDocuments();
            res.status(200).json({
                response_code: 200,
                success: true,
                result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false,
                message: 'Error occurred while fetching users'
            });
        }
    },
    getDocumentById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await documentService.getDocumentById(id);
            if (!result) {
                res.status(404).json({
                    response_code: 404,
                    success: false, message: 'Document not found'
                });
                return;
            }

            res.status(200).json({
                response_code: 200,
                success: true, product: result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching document'
            });
        }


    },
    updateDocument: async (req, res) => {
        const { id, name } = req.body;
        try {
            const result = await documentService.updateDocument(id, name);
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
    deleteProduct: async (req, res) => {
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
    }
}

export default documentController;