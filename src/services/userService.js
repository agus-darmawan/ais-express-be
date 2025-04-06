import userRepository from "../repositories/userRepository.js";
import { logger } from "../config/logger.config.js";

class UserService {
  async getAllUsers() {
    try {
      const users = await userRepository.findAll();
      return users;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error fetching users");
    }
  }

  async createUser(userData) {
    try {
      const user = await userRepository.create(userData);
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error creating user");
    }
  }
}

export default new UserService();
