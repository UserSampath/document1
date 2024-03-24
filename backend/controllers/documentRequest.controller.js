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
                const message = "happy docuementing"
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
    }

}

export default documentRequest;