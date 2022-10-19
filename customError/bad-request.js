import CustomApiError from './custom-api.js';
import statusCodes from 'http-status-codes';

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
