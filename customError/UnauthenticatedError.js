import CustomApiError from './custom-api.js';
import statusCodes from 'http-status-codes';

class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
