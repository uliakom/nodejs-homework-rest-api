const { Contact,addSchema} = require("../../models/contacts/contact");

const { RequestError } = require("../../helpers");

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
