
import { User, UserDocument, Document } from "../models/model.js";
import sequelize from "../config/db.connection.js";
import { Op, where } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
const userRepo = {

  findOrCreateUser: async (email, type) => {
    try {

      const data = await User.findOne({
        where: {
          email: email
        }
      });
      if (data) {
        return data;

      }
      const result = await User.create({ id: uuidv4(), email, type });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createUser: async (email, type) => {
    try {

      const data = await User.findOne({
        where: {
          email: email
        }
      });
      if (data) {
        return {
          status: false,
          message:"User already exists"
        }
      }
      const result = await User.create({ id: uuidv4(), email, type });
      return {
        status: true,
        message: "User created successfully",
        result
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateUser: async (userId, firstName, lastName, phone, reference_no) => {
    try {

      const result = await User.update(
        {
          firstName, lastName, phone, reference_no
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },


  getAllUsers: async () => {
    try {
      const users = await User.findAll({
        include: [{
          model: Document,
          through: {
            model: UserDocument,
          }
        }]
      });



      return users;
    } catch (error) {
      throw error;
    }
  },

  getUsersByPageAndFilter: async ({ page, limit, orderBy, sortBy, keyword, type }) => {

    try {
      const query = {};
      if (keyword) {
        query[Op.or] = [
          { firstName: { [Op.startsWith]: keyword } },
          { lastName: { [Op.startsWith]: keyword } },
          { email: { [Op.startsWith]: keyword } },

        ];
      }

      if (type) {
        query.type = type;
      }

      const queries = {
        offset: (page - 1) * limit,
        limit
      }

      if (orderBy) {
        queries.order = [[orderBy, sortBy]]
      }

      const users = await User.findAndCountAll({
        distinct: true,
        where: query,
        include: [{
          model: Document,
          through: {
            model: UserDocument,
          }
        }],
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

  getUserAllDataById: async (id) => {
    try {

      const result = await User.findOne({
        where: {
          id
        },
        include: [{
          model: Document,
          through: {
            model: UserDocument,
          }
        }],
      })


      return result;

    } catch (error) {
      throw error;
    }
  },



  getDocumentsOfUser: async (id) => {
    try {
      const users = await User.findOne({
        include: [{
          model: Document,
          through: {
            model: UserDocument,
            where: { is_agreed: false }
          },
        }]
        ,
        where: {
          id
        }
      });
      return users;
    } catch (error) {
      throw error;
    }
  },



}

export default userRepo;
