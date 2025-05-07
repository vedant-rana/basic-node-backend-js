import { TryCatch } from "../../middlewares/errorMiddlewares.js";
import User from "../../models/userModel.js";
import HttpStatus from "../../utils/constants/httpStatusCodes.js";
import ErrorHandler from "../../utils/customError.js";
import { successResponse } from "../../utils/responseFunctions.js";

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find().select("-password");

  return res
    .status(HttpStatus.OK)
    .json(successResponse(users, "Users Fethced Successfully!!"));
});

export const getUserById = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return next(new ErrorHandler("User not Found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(user, "User Fethced Successfully!!"));
});

export const createUser = TryCatch(async (req, res, next) => {
  const reqObj = req.body;

  const isExist = await User.findOne({
    email: reqObj.email,
  });

  if (isExist) {
    return next(new ErrorHandler("User already Exists!!", HttpStatus.CONFLICT));
  }

  const user = await User.create(reqObj);

  // return sendToken(
  //   res,
  //   next,
  //   user,
  //   HttpStatus.CREATED,
  //   "User created successfully"
  // );

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(user, "User created successfully"));
});

export const updateUser = TryCatch(async (req, res, next) => {});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isExist = await User.findById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`User with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deleted = await User.findByIdAndDelete(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "User deleted successfully"));
});

export const getUserDetails = TryCatch(async (req, res, next) => {});
