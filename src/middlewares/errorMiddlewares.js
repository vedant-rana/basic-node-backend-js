import { errorResponse } from "../utils/responseFunctions.js";

export const TryCatch = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // customizing cast error occuring due to inavallid id of mongodb document
  if (err.name === "CastError") err.message = "Invalid Id";

  res.status(err.statusCode).json(errorResponse(err.message, err));
  return;
};
