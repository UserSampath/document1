import productController from  "../controllers/product.controller.js";
import express from "express";
import adminAuthentication from "../middleware/adminAuthentication.js";
import multer from 'multer';

// Configure multer to handle file uploads
const upload = multer({dest: '/'});
const router = express.Router();


router.post("/createProduct",upload.single('image'),adminAuthentication,productController.createProduct);
router.get("/getProduct/:id",adminAuthentication,productController.getProductById);
router.get("/getAllProduct",adminAuthentication,productController.getAllProducts);
router.put ("/updateProduct",upload.single('image'),adminAuthentication,productController.updateProduct);
router.delete ("/deleteProduct/:id",adminAuthentication,productController.deleteProduct);
export default router;  