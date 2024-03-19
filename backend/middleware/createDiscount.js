import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
const createDiscount = async (req, res) => {
    try {
        const api = new WooCommerceRestApi({
            url: "https://deltamax.fit/",
            consumerKey: "ck_ebf6b43314ca37175104884bd9acd36a4e41d56b",
            consumerSecret: "cs_2968e78dd40b9dbe60196e02d980a0cff225ce3a",
            version: "wc/v3",
        });

        const data = {
            code: "28072151",
            discount_type: 'fixed_cart',
            amount: '10',
            individual_use: true,
            description: 'hasthiya1',
            usage_limit: 1,
            free_shipping: true,
            usage_limit_per_user: 1,
        };

        const response = await api.post("coupons", data);

        res.status(200).json({
            response_code: 200,
            result: response.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};

export default createDiscount;