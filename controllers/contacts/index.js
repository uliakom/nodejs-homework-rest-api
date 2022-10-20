const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const removeContactById = require("./removeContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavorite,
};
