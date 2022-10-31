const express = require("express");
const { controllerWrapper } = require("../../helpers");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
} = require("../../models/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { auth: controller } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  controllerWrapper(controller.register)
);

router.get("/verify/:verificationToken", controllerWrapper(controller.verify));

router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  controllerWrapper(controller.resendVerify)
);

router.post(
  "/login",
  validateBody(loginSchema),
  controllerWrapper(controller.login)
);

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

router.get("/logout", authenticate, controllerWrapper(controller.logout));

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar)
);

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  controllerWrapper(controller.updateSubscription)
);

module.exports = router;
