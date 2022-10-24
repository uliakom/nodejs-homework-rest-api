const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  if (!req.body) {
    throw new RequestError("missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
