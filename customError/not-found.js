import CustomApiError from './custom-api.js';
import statusCodes from 'http-status-codes';

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
