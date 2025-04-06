import User from "../models/user.model.js";

class UserRepository {
  async findAll() {
    return User.find();
  }

  async findById(id) {
    return User.findById(id);
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findOne(query) {
    return User.findOne(query);
  }
}

export default new UserRepository();
