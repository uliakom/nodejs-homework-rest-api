const { Contact } = require("../../models/contacts");

const getContacts = async (_, res) => {
  const result = await Contact.find({});
  res.json(result);
};

module.exports = getContacts;
