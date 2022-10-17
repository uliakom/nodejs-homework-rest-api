const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(controller.getContacts));

router.get("/:contactId", isValidId ,controllerWrapper(controller.getContactById));

router.post("/", controllerWrapper(controller.addContact));

router.delete("/:contactId", isValidId ,controllerWrapper(controller.removeContactById));

router.put("/:contactId", isValidId ,controllerWrapper(controller.updateContactById));

module.exports = router;
