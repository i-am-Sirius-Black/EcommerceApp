// Middleware for handling routes that are not found
export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  