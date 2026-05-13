import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
    name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength:[8, "Password must be at least 8 characters"],
        select: false,
    },
},
{
    timestamps: true,
}
);