const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isExisted = await userModel.findOne({ email });

  if (isExisted) {
    return res.status(409).json({ message: "Email already existed" });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
};

const loginController = async (req, res) => {};

module.exports = {
  registerController,
  loginController,
};
