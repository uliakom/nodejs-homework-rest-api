const express = require("express");
const { controllerWrapper } = require("../../helpers");
const { registerSchema, loginSchema } = require("../../models/users");

const { validateBody } = require("../../middlewares");

const { auth: controller } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  controllerWrapper(controller.register)
);

router.post(
  "/login",
  validateBody(loginSchema),
  controllerWrapper(controller.login)
);

module.exports = router;
