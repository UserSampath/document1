import userRepo from "../repositories/user.repo.js";

const userService = {

  createUser: async (email) => {

    try {
      const result = await userRepo.createUser(email);
      if (result) {
        return { status: true, message: "User created successfully", result }
      } else {
        return { status: false, message: "User create failed!" }

      }
    } catch (error) {

      throw error;

    }

  },

  getAllUsers: async () => {
    try {
      const result = await userRepo.getAllUsers();
      return result;
    } catch (error) {
      throw error;
    }
  },

}

export default userService;
