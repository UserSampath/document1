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
    // getAllDocuments: async (req, res) => {
    //     try {

    //         const result = await documentService.getAllDocuments();
    //         res.status(200).json({
    //             response_code: 200,
    //             success: true,
    //             result
    //         });

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             response_code: 500,
    //             success: false,
    //             message: 'Error occurred while fetching document'
    //         });
    //     }
    // },
    // getDocumentById: async (req, res) => {
    //     const id = req.params.id;

    //     try {
    //         const result = await documentService.getDocumentByName(id);
    //         if (!result) {
    //             res.status(404).json({
    //                 response_code: 404,
    //                 success: false, message: 'Document not found'
    //             });
    //             return;
    //         }

    //         res.status(200).json({
    //             response_code: 200,
    //             success: true, product: result
    //         });

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             response_code: 500,
    //             success: false, message: 'Error occurred while fetching document'
    //         });
    //     }


    // },
    // updateDocument: async (req, res) => {
    //     const { name } = req.body;
    //     const file = req.files.pdf;
    //     try {

    //         const data = await cloudinary.uploader.upload(file.tempFilePath, {
    //             public_id: `${Date.now()}`,
    //             resource_type: 'auto',
    //             folder: "documents",
    //         })
    //         if (!data.secure_url) {
    //             throw new Error("Cannot upload document")
    //         }

    //         const result = await documentService.updateDocument(name, data.secure_url);
    //         if (result.status) {
    //             res.status(200).json({
    //                 response_code: 200,
    //                 result
    //             });
    //         } else {
    //             res.status(400).json({
    //                 response_code: 400,
    //                 result
    //             });
    //         }
    //     } catch (error) {
    //         res.status(500).json({
    //             response_code: 500,
    //             status: false,
    //             error: error.message
    //         });
    //     }
    // },


    // deleteProduct: async (req, res) => {
    //     const id = req.params.id;

    //     try {
    //         const isDocumentDelete = await documentService.deleteDocumentById(id);

    //         if (isDocumentDelete) {
    //             res.status(200).json({
    //                 response_code: 200,
    //                 success: true,
    //                 message: 'document deleted successfully'
    //             });

    //         } else {
    //             res.status(404).json({
    //                 response_code: 404,
    //                 success: false,
    //                 message: 'document not found'
    //             });

    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             response_code: 500,
    //             success: false, message: 'Error occurred while deleting document',

    //         });
    //     }
    // },

    // getDocumentByName: async (req, res) => {
    //     const name = req.params.name;

    //     try {
    //         const result = await documentService.getDocumentByName(name);
    //         if (!result) {
    //             res.status(404).json({
    //                 response_code: 404,
    //                 success: false, message: 'Document not found'
    //             });
    //             return;
    //         }

    //         res.status(200).json({
    //             response_code: 200,
    //             success: true, result
    //         });

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             response_code: 500,
    //             success: false, message: 'Error occurred while fetching document'
    //         });
    //     }


    // },
}

export default documentController;