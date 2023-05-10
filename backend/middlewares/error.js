const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

const duplicateEmailHandler = (error, req, res, next) => {
  if (error.code === 11000) {
    res.status(400);
    const newError = new Error('A member with this email already exists');
    next(newError);
  } else {
    next(error);
  }
};

export { notFound, errorHandler, duplicateEmailHandler };
