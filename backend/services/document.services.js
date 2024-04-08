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
    // getAllDocuments: async () => {
    //     try {
    //         const result = await documentRepo.getAllDocuments();
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // getDocumentByName: async (id) => {
    //     try {
    //         const result = await documentRepo.getDocumentById(id);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // updateDocument: async (name, src) => {
    //     try {

    //         const result = await documentRepo.updateDocument(name, src);
    //         if (result) {
    //             return {
    //                 status: true,
    //                 message: "document updated successfully",
    //                 result
    //             }
    //         } else {
    //             return {
    //                 status: false,
    //                 message: "document not updated",
    //             }
    //         }

    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // deleteDocumentById: async (id) => {
    //     try {
    //         const result = await documentRepo.deleteDocumentById(id);
    //         return result > 0;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getDocumentByName: async (name) => {
    //     try {
    //         const result = await documentRepo.getDocumentByName(name);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

}
export default documentService;