const express = require("express");
const { controllerWrapper } = require("../../helpers");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../models/users");

const { validateBody, authenticate } = require("../../middlewares");

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

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

router.get("/logout", authenticate, controllerWrapper(controller.logout));

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  controllerWrapper(controller.updateSubscription)
);

module.exports = router;
