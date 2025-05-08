import { TryCatch } from "../middlewares/errorMiddlewares.js";
import User from "../models/userModel.js";
import { deleteFileFromServer, getUrlPath } from "../utils/commonFunctions.js";
import HttpStatus from "../utils/constants/httpStatusCodes.js";
import ErrorHandler from "../utils/customError.js";
import { RolesEnum } from "../utils/enums/commonEnums.js";
import { sendToken } from "../utils/manageJwtToken.js";
import { successResponse } from "../utils/responseFunctions.js";

export const loginUser = TryCatch(async (req, res, next) => {
  const reqObj = req.body;

  const isExist = await User.findOne({ email: reqObj.email });

  if (!isExist) {
    return next(
      new ErrorHandler("Invalid credentials", HttpStatus.UNAUTHORIZED)
    );
  }

  const isMatch = await isExist.comparePassword(reqObj.password);

  if (!isMatch) {
    return next(
      new ErrorHandler("Invalid credentials", HttpStatus.UNAUTHORIZED)
    );
  }

  const user = await User.findOne({ email: reqObj.email }).select("-password");

  return sendToken(
    res,
    next,
    user,
    HttpStatus.OK,
    "User logged in successfully"
  );
});

export const signupUser = TryCatch(async (req, res, next) => {
  const file = req.file;
  const reqObj = req.body;

  if (file != null) {
    reqObj.profileImage = getUrlPath(file.filename);
  }

  const isExist = await User.findOne({ email: reqObj.email });

  if (isExist != null) {
    if (file != null) {
      const filePath = getUrlPath(file.filename);
      deleteFileFromServer(filePath);
    }
    return next(new ErrorHandler("User alreay Exist", HttpStatus.CONFLICT));
  }

  const credenetialData = {
    ...reqObj,
    isActive: true,
    role: RolesEnum.USER,
  };

  const newUser = await User.create(credenetialData);

  if (!newUser) {
    if (file != null) {
      const filePath = getUrlPath(file.filename);
      deleteFileFromServer(filePath);
    }

    return next(new ErrorHandler("User Creation Failed", HttpStatus.CONFLICT));
  }

  const user = await User.findOne({ email: newUser.email }).select("-password");

  return sendToken(
    res,
    next,
    user,
    HttpStatus.OK,
    "User Signed Up successfully !!"
  );
});

export const logoutUser = TryCatch(async (req, res, next) => {
  res
    .clearCookie("token")
    .json(successResponse(null, "User logged out successfully"));
});
