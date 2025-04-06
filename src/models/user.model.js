import mongoose from "mongoose";
import { userRoles } from "../enums/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.USER],
      default: userRoles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
