import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
    name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    },
    