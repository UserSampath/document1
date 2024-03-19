import userService from "../services/user.services.js";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
  cloud_name: 'dcif58he2', 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});

const opts ={
    overwrite: true,
    invalidate: true,
    resource_type:"auto",
}
const userController = {

  registerUser: async (req, res) => {
    try {
        const { email, password, firstName, lastName, points, notificationToken } = req.body;

        const result = await userService.registerUser(email, password, firstName, lastName, points, notificationToken);

        if (result.status) {
            // Status is true, so registration is successful
            res.status(200).json({
                response_code: 200,
                success: true,
                message: result.message,
                user: { firstName, lastName, email},
                token: result.token
            });
        } else {
            // Status is false, there is an error
            res.status(400).json({
                response_code: 400,
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            response_code: 500,
            error: error,
            success: false,
            message: 'Error occurred while registering user'
        });
    }
},

  userLogin: async (req, res) => {
    const { email, password, notificationToken } = req.body;
    try {
      const result = await userService.userLogin(email, password, notificationToken);
      res.status(200).json({
        response_code: 200,
        result
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Error occurred'
      });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const isUserDelete = await userService.deleteUserById(userId);

      if (isUserDelete) {
        res.status(200).json({
          response_code: 200,
          success: true, message: 'User deleted successfully'
        });
      } else {
        res.status(404).json({
          response_code: 404,
          success: false, message: 'User not found'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while deleting user'
      });

    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ response_code: 404, success: false, message: 'User not found' });
        return;
      }
      res.status(200).json({
        response_code: 200,
        success: true, user
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching user'
      });
    }
  },

  getAllUsersForUser: async (req, res) => {
    try {
      const allUsers = await userService.getAllUsersForUser();
      const simplifiedUserData = allUsers.map(user => ({ firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image, points: user.points }));
      res.status(200).json({
        response_code: 200,
        success: true, users: simplifiedUserData
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching users'
      });
    }
  },


  getAllUsersForAdmin: async (req, res) => {
    try {
      const allUsers = await userService.getAllUsersForAdmin();
      const simplifiedUserData = allUsers.map(user => ({ firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image, points: user.points }));
      res.status(200).json({
        response_code: 200,
        success: true, users: simplifiedUserData
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching users'
      });
    }
  },
  getUserByPage: async (req, res) => {
    try {
      const { page = 1, limit = 3, orderBy = 'email', sortBy = 'asc', keyword } = req.query;


      const users = await userService.getAllUserByPage({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 3,
        orderBy,
        sortBy,
        keyword
      });

      res.status(200).json(
        {
          response_code: 200,
          success: true,
          users
        });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching users'
      });
    }
  },

  changeUserPassword: async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await userService.changeUserPassword(
        userId,
        oldPassword,
        newPassword
      );
      res.status(200).json({
        response_code: 200,
        result
      });
    } catch (error) {
      res.status(500).json({
        response_code: 500,
        error: "Error occurred!"
      });
    }
  },

  updateUser: async (req, res) => {
    const { userId, email, firstName, lastName, points, notificationToken } = req.body;
    let imageUrl = ""; // Initialize imageUrl variable
  
    // Check if file is provided in the form data
    if (req.file) {
      try {
        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, opts);
        // Extract secure URL of the uploaded image from Cloudinary response
        imageUrl = cloudinaryResponse.secure_url;
      } catch (error) {
        return res.status(500).json({
          response_code: 500,
          status: false,
          error: "Error uploading image to database"
        });
      }
    }
    
    try {
      const result = await userService.updateUser(userId, email, firstName, lastName, imageUrl, points, notificationToken);
     
      if (result) {
        res.status(200).json({
          response_code: 200,
          result
        })
      } else {
        res.status(400).json({
          response_code: 400,
          result
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      })
    }
  },
  
  sendOTP: async (req, res) => {
    const { email } = req.body;
    try {
      await userService.generateAndSendOTP(email);
      res.status(200).json({
        response_code: 200,
        success: true, message: 'OTP sent successfully.'
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Internal Server Error'
      });
    }
  },

  ChangePasswordWithOtp: async (req, res) => {
    const userId = req.params.id;
    const { newPassword, enteredOTP } = req.body;
    try {
      const result = await userService.changeUserPasswordWithOTP(userId, newPassword, enteredOTP);
      res.status(200).json({
        response_code: 200,
        result, success: true, message: 'Password changed successfully.'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: 'Internal Server Error'
      });
    }
  }

}

export default userController;