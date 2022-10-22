const express = require("express");

const { contacts: controller } = require("../../controllers");

const { controllerWrapper } = require("../../helpers");

const { addSchema, updateFavoriteSchema } = require("../../models/contacts");

const { isValidId, validateBody,authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(controller.getContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.removeContactById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  controllerWrapper(controller.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
