export function successResponse(data, message = "Operation successful") {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse(message, error) {
  return {
    success: false,
    message,
    error,
  };
}
