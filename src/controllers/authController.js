import { TryCatch } from "../middlewares/errorMiddlewares.js";
import HttpStatus from "../utils/constants/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunctions.js";

export const loginUser = TryCatch(async (req, res, next) => {
  return res
    .status(HttpStatus.OK)
    .json(successResponse("Hello from Login", "Login successful"));
});
export const signupUser = TryCatch(async (req, res, next) => {});
