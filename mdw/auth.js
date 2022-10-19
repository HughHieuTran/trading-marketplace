import { UnauthenticatedError } from '../customError/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthenticatedError('authenication failed');
  }
  const userToken = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (err) {
    throw new UnauthenticatedError('authenticated failed');
  }
  next();
};

export default auth;
