const { User } = require("../../models/users");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "this email is already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const verificationToken = uuidv4();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      verificationToken: result.verificationToken,
    },
    message: "New user registered",
  });
};

module.exports = register;
