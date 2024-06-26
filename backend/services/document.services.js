import documentRepo from "../repositories/document.repo.js";
const documentService = {
    createDocument: async (name, src, type, is_need_attachment) => {

        try {
            const result = await documentRepo.createDocument(name, src, type, is_need_attachment);
            if (result) {
                return { status: true, message: "Document created successfully", result }
            } else {
                return { status: false, message: "Document create failed!" }

            }
        } catch (error) {

            throw error;

        }

    },

    getAllDocumentsWithFilter: async (type) => {

        try {
            const result = await documentRepo.getAllDocumentsWithFilter(type);
            if (result) {
                return { status: true, message: "Get document successfully", result }
            } else {
                return { status: false, message: "Get document failed!" }
            }
        } catch (error) {
            throw error;
        }

    },

    updateDocument: async (id, name, src, is_need_attachment, type) => {
        try {

            const result = await documentRepo.updateDocument(id, name, src, is_need_attachment, type);
            if (result) {
                return {
                    status: true,
                    message: "document updated successfully",
                    result
                }
            } else {
                return {
                    status: false,
                    message: "document not updated",
                }
            }

        } catch (error) {
            throw error;
        }
    },
    deleteDocumentById: async (id) => {
        try {
            const result = await documentRepo.deleteDocumentById(id);
            return result > 0;
        } catch (error) {
            throw error;
        }
    },
    getDocumentById: async (id) => {
        try {
            const result = await documentRepo.getDocumentById(id);
            if (result) {
                return {
                    success: true,
                    result
                }
            } else {
                return {
                    success: false,
                    message: "Document not found"
                }
            }

        } catch (error) {
            throw error;
        }
    },

}
export default documentService;