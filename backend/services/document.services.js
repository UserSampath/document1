import documentRepo from "../repositories/document.repo.js";
const documentService = {
    createDocument: async (name, src) => {

        try {
            const result = await documentRepo.createDocument(name, src);
            if (result) {
                return { status: true, message: "Document created successfully", result }
            } else {
                return { status: false, message: "Document create failed!" }

            }
        } catch (error) {

            throw error;

        }

    },
    getAllDocuments: async () => {
        try {
            const result = await documentRepo.getAllDocuments();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getDocumentById: async (id) => {
        try {
            const result = await documentRepo.getDocumentById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updateDocument: async (id, name) => {
        try {

            const result = await documentRepo.updateDocument(id, name);
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

}
export default documentService;