
import { User, documentRequest } from "../models/model.js";
import sequelize from "../config/db.connection.js";
import { Op, where } from "sequelize";
import nodemailer from "nodemailer";

const userRepo = {

  createUser: async (request_id, firstName, lastName, phone, reference_no) => {
    try {
      await sequelize.sync();
      const existingUser = await User.findOne({
        where: { user_id: request_id }
      })

      if (existingUser) {
        throw new Error("User already submitted")
      }
      const result = await User.create({ user_id: request_id, firstName, lastName, phone, reference_no });
      await documentRequest.update({
        is_agreed: true,
      },
        {
          where: {
            id: request_id,
          },
        })
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const result = await User.findAll({
        include: [{
          model: documentRequest,
        }
      ],
      });
      return result;
    } catch (error) {
      throw error;
    }
  },


}

export default userRepo;
