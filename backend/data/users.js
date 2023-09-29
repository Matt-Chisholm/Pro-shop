import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10), // 10 is the salt
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    password: bcrypt.hashSync("123456", 10), // 10 is the salt
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: bcrypt.hashSync("123456", 10), // 10 is the salt
    isAdmin: false,
  },
];

export default users;
