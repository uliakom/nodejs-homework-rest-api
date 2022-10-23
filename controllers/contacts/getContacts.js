const { Contact } = require("../../models/contacts");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  );

  res.json(result);
};

module.exports = getContacts;
