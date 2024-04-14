import userRepo from "../repositories/user.repo.js";

const userService = {

  createUser: async (email, type) => {

    try {
      const result = await userRepo.createUser(email, type);
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

  getUsersByPageAndFilter: async ({ page, limit, orderBy, sortBy, keyword, type }) => {
    try {
      const allUsers = await userRepo.getUsersByPageAndFilter({ page, limit, orderBy, sortBy, keyword, type });
      return allUsers;
    } catch (error) {
      throw error;
    }
  },

  getDocumentsOfUser: async (id) => {
    try {
      const result = await userRepo.getDocumentsOfUser(id);
      return result;
    } catch (error) {
      throw error;
    }
  },

}

export default userService;
