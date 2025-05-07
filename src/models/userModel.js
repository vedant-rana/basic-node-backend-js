import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
    },
    profileImage: {
      type: String,
      default: "https://example.com/default-profile-image.png",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  let expiresIn =
    Number(process.env.JWT_EXPIRES_IN) * 3600 * 24 || 3600 * 24 * 5;

  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

const User = model("User", userSchema);

export default User;
