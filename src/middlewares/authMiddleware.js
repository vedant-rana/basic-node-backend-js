import User from "../models/userModel.js";
import HttpStatus from "../utils/constants/httpStatusCodes.js";
import ErrorHandler from "../utils/customError.js";
import { RolesEnum } from "../utils/enums/commonEnums.js";
import { verifyJWTToken } from "../utils/manageJwtToken.js";
import { TryCatch } from "./errorMiddlewares.js";

export const authorize = TryCatch(async (req, res, next) => {
  const { token } = req.cookies;

  if (token == null) {
    return next(
      new ErrorHandler(
        "Please login to access this resource",
        HttpStatus.UNAUTHORIZED
      )
    );
  }

  const decodedData = await verifyJWTToken(token);
  const user = await User.findById(decodedData.id);

  // if (user) {
  req.user = user;
  // }
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(Number(req.user?.role || RolesEnum.USER))) {
      return next(
        new ErrorHandler(
          `You are not allowed to access this resource`,
          HttpStatus.FORBIDDEN
        )
      );
    }

    next();
  };
};
