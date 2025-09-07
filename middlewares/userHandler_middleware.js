// custom error handler
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      Number(statusCode) >= 400 && Number(statusCode) < 500 ? "fail" : "error";
  }
}

export const errorHandler = (error, req, res, next) => {
  console.log("Error handler");
  console.log(error);
  const message = error?.message || "internal server error";
  const statusCode = error?.statusCode || 500;
  const status = error?.status || "server error";
  const success = error?.success || false;
  res.status(500).json({
    message,
    status,
    success,
    originalError:
      process.env.NODE_ENV === "development" ? error.stack : message,
  });
};
export default CustomError;
