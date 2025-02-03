class ResponseUtil {
    static success(data, message = 'Success') {
      return {
        status: 'success',
        message,
        data
      };
    }
  
    static fail(message = 'Failed') {
      return {
        status: 'fail',
        message
      };
    }
  
    static error(message = 'Internal server error') {
      return {
        status: 'error',
        message
      };
    }
  }
  
  module.exports = ResponseUtil;