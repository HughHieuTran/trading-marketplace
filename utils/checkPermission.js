import { UnauthenticatedError } from '../customError/index.js';

const checkPermission = (user, id2) => {
  if (user.role === 'admin') return;
  if (user.userId !== id2) {
    throw new UnauthenticatedError('You are not allowed to do this');
  }
};

export default checkPermission;
