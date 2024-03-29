import documentRequestRepo from "../repositories/documentReq.repo.js";


const documentReqService = {
    createDocumentRequest: async (email, employeeStatus) => {

        try {
            const result = await documentRequestRepo.createDocumentRequest(email, employeeStatus);
            if (result) {
                return { status: true, message: "Document request created successfully", result }
            } else {
                return { status: false, message: "Document create failed!" }

            }
        } catch (error) {

            throw error;

        }

    },
    getAllDocumentRequests: async () => {
        try {
            const result = await documentRequestRepo.getAllDocumentRequests();
            return result;
        } catch (error) {
            throw error;
        }
    },
    getDocumentRequestById: async (id) => {
        try {
            const result = await documentRequestRepo.getDocumentRequestsById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllReqDocByPage: async ({page,limit,orderBy,sortBy,keyword}) => {
        try {
          const allUsers = await documentRequestRepo.getReqDocByPage({ page, limit, orderBy, sortBy, keyword });
          return allUsers;
        } catch (error) {
          throw error;
        }
      },
    deleteDocumentById: async (id) => {
        try {
            const result = await documentRequestRepo.deleteDocumentRequestsById(id);
            return result > 0;
        } catch (error) {
            throw error;
        }
    },

    getAllUserByPage: async ({ page, limit, orderBy, sortBy, keyword }) => {
        try {
            const allUsers = await documentRequestRepo.getUsersByPage({ page, limit, orderBy, sortBy, keyword });
            return allUsers;
        } catch (error) {
            throw error;
        }
    },
}
export default documentReqService;