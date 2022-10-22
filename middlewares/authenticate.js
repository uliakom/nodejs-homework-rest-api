const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
 try {
        const {authorization = ""} = req.headers;
        const [bearer = "", token = ""] = authorization.split(" ");
        if(bearer !== "Bearer") {
            throw RequestError(401);
        }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = User.findById(id);
      if (!user) {
        throw RequestError(401, "Unauthorize");
        }
        next()
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
