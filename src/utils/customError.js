class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Optional: maintain proper stack trace (especially useful in Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler);
    }
  }
}

export default ErrorHandler;
