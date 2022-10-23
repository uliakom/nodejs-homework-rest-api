const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  if (!req.body) {
    throw new RequestError("missing field subscription");
  }
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "User not Found");
  }
  res.status(200).json({ result, message: "Subscription updated" });
};

module.exports = updateSubscription;
