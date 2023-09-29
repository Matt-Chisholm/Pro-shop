import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // name of the user
    email: { type: String, required: true, unique: true }, // email of the user
    password: { type: String, required: true }, // password of the user
    isAdmin: { type: Boolean, required: true, default: false }, // is user an admin
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
