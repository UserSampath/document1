import sendEmail from "../config/EmailSend/sendEmail.js";
import documentReqService from "../services/documentReq.services.js";


const documentRequest  ={
    createDocumentRequeset: async (req, res) => {
        try{
            const { email, employeeStatus,is_agreed } = req.body;
            const result = await documentReqService.createDocumentRequest(email, employeeStatus,is_agreed);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                });
                const message = `short Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                http://localhost:5173/document/${result.result.id}
                `


                sendEmail(email,message)
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                });
            }
        }catch(error){
            res.status(500).json({
                response_code: 500,
                status: false,
                error: error.message
            });
        }
    },
    getAllDocumentRequeset: async (req, res) => {
        try {

            const result = await documentReqService.getAllDocumentRequests();
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
    getDocumentRequestById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await documentReqService.getDocumentRequestById(id);
            if (!result) {
                res.status(404).json({
                    response_code: 404,
                    success: false, message: 'Document not found'
                });
                return;
            }

            res.status(200).json({
                response_code: 200,
                success: true, result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching document'
            });
        }
    },

    getReqDocByPage: async (req, res) => {
        try {
          const { page = 1, limit = 3, orderBy = 'email', sortBy = 'asc', keyword } = req.query;
    
          const requirmentDoc = await documentReqService.getAllReqDocByPage({
            page: +page ? +page : 1,
            limit: +limit ? +limit : 3,
            orderBy,
            sortBy,
            keyword
          });
    
          res.status(200).json(
            {
              response_code: 200,
              success: true,
              requirmentDoc
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

    deleteDocumentReq: async (req, res) => {
        const id = req.params.id;

        try {
            const isDocumentDelete = await documentReqService.deleteDocumentById(id);

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

export default documentRequest;