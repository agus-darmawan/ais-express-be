import express from "express";
import UserService from "../services/userService.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { apiResponse } from "../utils/apiResponse.js";

const router = express.Router();

// Get all users (requires authentication)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    apiResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    apiResponse(res, 500, error.message);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    apiResponse(res, 201, "User created successfully", user);
  } catch (error) {
    apiResponse(res, 500, error.message);
  }
});

export default router;
