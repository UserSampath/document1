
import { User } from "../models/model.js";
import sequelize from "../config/db.connection.js";
import { Op, where } from "sequelize";
import nodemailer from "nodemailer";

const userRepo = {

  findOrCreateUser: async (email) => {
    try {

      const data = await User.findOne({
        where: {
          email: email
        }
      });
      if (data) {
        console.log(data,"nnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        return data;

      }
      const result = await User.create({ email });

      return result;
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
      const result = await User.findAll({
      });
      return result;
    } catch (error) {
      throw error;
    }
  },


}

export default userRepo;
