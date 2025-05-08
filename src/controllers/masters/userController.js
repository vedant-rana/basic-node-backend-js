import mongoose from "mongoose";
import { TryCatch } from "../../middlewares/errorMiddlewares.js";
import User from "../../models/userModel.js";
import HttpStatus from "../../utils/constants/httpStatusCodes.js";
import ErrorHandler from "../../utils/customError.js";
import { successResponse } from "../../utils/responseFunctions.js";
import { DEFAULT_LOGO_URL } from "../../utils/constants/commonConstants.js";
import {
  deleteFileFromServer,
  getUrlPath,
} from "../../utils/commonFunctions.js";

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
  const file = req.file;

  if (file != null) {
    reqObj.profileImage = getUrlPath(file.filename);
  }

  const isExist = await User.findOne({
    email: reqObj.email,
  });

  if (isExist) {
    deleteFileFromServer(reqObj.profileImage);
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

export const updateUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const reqObj = req.body;
  const file = req.file;

  if (file != null) {
    reqObj.profileImage = getUrlPath(file.filename);
  }

  const isExist = await User.findById(id);

  if (!isExist) {
    deleteFileFromServer(reqObj.profileImage);
    return next(new ErrorHandler("User not found", HttpStatus.NOT_FOUND));
  } else {
    //checking if update object not have file then logoUrl will not be changed in DB
    if (file == null) {
      reqObj.logoUrl = isExist.logoUrl;
    }
  }

  const isExistWithOtherParams = await User.findOne({
    email: reqObj.email,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isExistWithOtherParams) {
    if (reqObj.profileImage != DEFAULT_LOGO_URL) {
      deleteFileFromServer(reqObj.profileImage);
    }
    return next(new ErrorHandler(`User already Exists!!`, HttpStatus.CONFLICT));
  }

  const previousImageUrl = isExist.profileImage;

  const updated = await User.findByIdAndUpdate(id, reqObj, {
    new: true,
  }).select("-password");

  if (updated != null) {
    if (
      previousImageUrl !== DEFAULT_LOGO_URL &&
      previousImageUrl !== updated.profileImage
    ) {
      deleteFileFromServer(previousImageUrl);
    }
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updated, "User updated successfully"));
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isExist = await User.findById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`User with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deleted = await User.findByIdAndDelete(id);

  if (deleted != null) {
    if (deleted.profileImage !== DEFAULT_LOGO_URL) {
      deleteFileFromServer(deleted.profileImage);
    }
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "User deleted successfully"));
});

export const getUserDetails = TryCatch(async (req, res, next) => {});
