import documentRequestRepo from "../repositories/documentReq.repo.js";


const documentReqService = {
    createDocumentRequest: async (email, employeeStatus,is_agreed) => {

        try {
            const result = await documentRequestRepo.createDocumentRequest(email, employeeStatus,is_agreed);
            if (result) {
                return { status: true, message: "Document request created successfully", result }
            } else {
                return { status: false, message: "Document create failed!" }

            }
        } catch (error) {

            throw error;

        }

    },
}
export default documentReqService;