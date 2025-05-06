import jwt from "jsonwebtoken";
import HttpStatus from "./constants/httpStatusCodes";
import ErrorHandler from "./customError";
import { successResponse } from "./responseFunctions";

export const sendToken = (res, next, user, statusCode, message) => {
  const token = user?.getJWTToken();

  if (!token) {
    return next(
      new ErrorHandler(
        "Token creation failed!!",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    );
  }

  const cookieExpiresDays = Number(process.env.COOKIE_EXPIRES_DAYS) || 5;

  const options = {
    expires: new Date(Date.now() + cookieExpiresDays * 24 * 60 * 60 * 1000),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json(successResponse(user, message));
};

export const verifyJWTToken = async (token) => {
  const result = await jwt.verify(token, process.env.JWT_SECRET);
  return result;
};
