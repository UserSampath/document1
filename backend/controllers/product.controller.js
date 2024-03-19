import { v2 as cloudinary } from 'cloudinary';
import productService from "../services/product.services.js";
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

const productController = {


    createProduct: async (req, res) => {
        try {
            const { productName, description, image, price } = req.body;
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
            const result = await productService.createProduct(productName, description, imageUrl, price);
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


    getAllProducts: async (req, res) => {
        try {

            const allProducts = await productService.getAllProducts();
            res.status(200).json({
                response_code: 200,
                success: true, products: allProducts
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching users'
            });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;

        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                res.status(404).json({
                    response_code: 404,
                    success: false, message: 'Product not found'
                });
                return;
            }

            res.status(200).json({
                response_code: 200,
                success: true, product
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while fetching user'
            });
        }


    },
    updateProduct: async (req, res) => {
        const { productId, productName, description, price } = req.body;
        
        let imageUrl = ""; // Initialize imageUrl variable
        if (req.file) {
            // Upload image to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, opts);
            imageUrl = cloudinaryResponse.secure_url;
        }
        try {
            const result = await productService.updateProduct(productId, productName, description, imageUrl, price);
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
        const productId = req.params.id;

        try {
            const isProductDelete = await productService.deleteProductById(productId);

            if (isProductDelete) {
                res.status(200).json({
                    response_code: 200,
                    success: true, message: 'product deleted successfully'
                });

            } else {
                res.status(404).json({
                    response_code: 404,
                    success: false, message: 'product not found'
                });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                success: false, message: 'Error occurred while deleting product',

            });
        }
    }
}

export default productController;