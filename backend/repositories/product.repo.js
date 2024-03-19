import { Products } from "../models/model.js";
import sequelize from "../config/db.connection.js"


const productRepo = {

    createProduct: async (productName, description, image, price) => {
        try {
            await sequelize.sync();
            const product = await Products.create({ productName, description, image, price });
            return product;
        } catch (error) {
            throw error;
        }
    },

    getAllProducts : async()=>{
        try{
            const AllProducts = await Products.findAll();
            return AllProducts;
        }catch(error){
        throw error;
        }
    },



    getProductsById: async (productId) => {
        try {
            const result = await Products.findOne({
                where: {
                    id: productId,
                },
            });
            return result;
        } catch (error) {
            throw error;

        }
    },

    updateProduct: async (productId, productName, description, image, price) => {
        console.log(productName)
        try {
            const updatedRaws = await Products.update({
                productName, description, image, price
            }, { where: { id: productId } });
            if (updatedRaws > 0) {
                const updatedProduct = await Products.findByPk(productId);
                return updatedProduct;
            }
        } catch (error) {
            throw error;
        }
    },

    deleteProductById: async (productId) => {
        try {
            const result = await Products.destroy({
                where: {
                    id: productId,
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default productRepo;