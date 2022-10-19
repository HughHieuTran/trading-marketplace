import statusCodes from 'http-status-codes';

const errorHandlerMdw = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };
  if (err.name === 'ValidationError') {
    defaultError.statusCode = statusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(', ');
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = statusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue).join(
      ', '
    )} field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMdw;
