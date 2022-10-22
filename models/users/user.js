const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleValidationErrors } = require("../../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password should have minimum eight characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidationErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
};
