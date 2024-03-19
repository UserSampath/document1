import productRepo from "../repositories/product.repo.js";
const productService ={
    createProduct: async (productName, description, image, price) => {

        try{
            const product = await productRepo.createProduct(productName,description,image,price);
            if(product){
                return { status: true, message: "Product created successfully", product }
            }else{
                return { status: false, message: "Product create failed!" }

            }
        }catch(error){

            throw error;

        }

    },
    getAllProducts :async ()=>{
        try{
            const allProducts = await productRepo.getAllProducts();
            return allProducts;
        }catch(error){
            throw error;
        }
    },
    getProductById : async (productId)=>{
        try{
            const product = await productRepo.getProductsById(productId);
            return product;
        }catch(error){
            throw error;
        }
    },
    updateProduct: async (productId, productName, description, image, price) => {
        try{
            let updatedProduct;

            if (image) {
                updatedProduct = await productRepo.updateProduct(productId, productName, description, image, price);
            } else {
                const currentProduct = await productRepo.getProductsById(productId);
                updatedProduct = await productRepo.updateProduct(productId, productName, description, currentProduct.image, price);
            }
        
        if(updatedProduct){
            return {
                status: true,
                message: "product updated successfully",
                updatedProduct
            }
        }else{
            return {
                status: false,
                message: "product not updated",
            }
        }

        }catch(error){
            throw error;
        }
    },
    deleteProductById : async (productId) => {
        try{
            const result = await productRepo.deleteProductById(productId);
            return result>0;
        }catch(error){
            throw error;
        }
    },
}
export default productService;