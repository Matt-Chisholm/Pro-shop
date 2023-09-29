import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productmodel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // clear all data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert users into the database
    const createdUsers = await User.insertMany(users);

    // get admin user from the database
    const adminUser = createdUsers[0]._id;

    // add admin user to the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert products into the database
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // clear all data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// run the following commands to import and destroy data
// node backend/seeder -i
// node backend/seeder -d
