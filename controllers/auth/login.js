const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "this user is not registered");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw RequestError(401, "Wrong password");
    }
    
    const payload = {
        id:user._id
    }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  res.json({
    token,
  });
};

module.exports = login;
