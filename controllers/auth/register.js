const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "this email is already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
    message: "New user registered",
  });
};

module.exports = register;
