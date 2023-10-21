import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
