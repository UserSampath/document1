import { documentRequest,User } from "../models/model.js";
import sequelize from "../config/db.connection.js"
import { Op, where } from "sequelize";

const documentRequestRepo = {

    createDocumentRequest: async (email, employeeStatus) => {
        try {
            await sequelize.sync();

            const existingRequest = await documentRequest.findOne({
              where: { email: email }
            })
          
            if (existingRequest) {
              throw new Error("This email already send");
            }
            
            const result = await documentRequest.create({ email, employeeStatus,});
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllDocumentRequests: async () => {
        try {
            const result = await documentRequest.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    },
    getDocumentRequestsById: async (id) => {
        try {
            const result = await documentRequest.findOne({
                where: {
                    id
              },
              include: [{
                model: User,
              }]
            });
            return result;
        } catch (error) {
            throw error;

        }
    },

    deleteDocumentRequestsById: async (id) => {
        try {
            const result = await documentRequest.destroy({
                where: {
                    id
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    },

    getReqDocByPage: async ({ page, limit, orderBy, sortBy, keyword }) => {

        try {
          const query = {};
          if (keyword) {
            query[Op.or] = [
              { email: { [Op.startsWith]: keyword } },
            ];
          }
    
          const queries = {
            offset: (page - 1) * limit,
            limit
          }
    
          if (orderBy) {
            queries.order = [[orderBy, sortBy]]
          }
          const users = await documentRequest.findAndCountAll({
            where: query,
            attributes: ['id',  'email', 'employeeStatus','is_agreed', "createdAt"],
            ...queries
          })
    
          return {
            totalPages: Math.ceil(users?.count / limit),
            totalItems: users?.count,
            data: users?.rows
          };
        } catch (error) {
          throw error;
        }
  },
    
  getUsersByPage: async ({ page, limit, orderBy, sortBy, keyword }) => {
    try {
      const query = {};
      if (keyword) {
        query[Op.or] = [
          { firstName: { [Op.startsWith]: keyword } },
          { lastName: { [Op.startsWith]: keyword } }
        ];
      }
      const queries = {
        offset: (page - 1) * limit,
        limit
      }

      if (orderBy) {
        queries.order = [[orderBy, sortBy]]
      }
      const users = await User.findAndCountAll({
        where: query,
        include: [{
          model: documentRequest,
        }
        ],
        ...queries
      })

      return {
        totalPages: Math.ceil(users?.count / limit),
        totalItems: users?.count,
        data: users?.rows
      };
    } catch (error) {
      throw error;
    }
  },
}

export default documentRequestRepo;