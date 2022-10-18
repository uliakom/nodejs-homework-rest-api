const  { Contact } = require("../../models/contacts/contact");
const { RequestError } = require("../../helpers");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw RequestError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Contact deleted" });
};

module.exports = removeContactById;
