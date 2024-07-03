class CustomError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode

    // Set the prototype explicitly to fix issues with inheritance
    Object.setPrototypeOf(this, new.target.prototype)

    // Maintain proper stack trace (only available on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

class ValidationError extends CustomError {
  public errors: string[]

  constructor(message = 'Validation failed', errors: string[] = []) {
    super(message, 400)
    this.errors = errors
  }
}

class AuthenticationError extends CustomError {
  constructor(message = 'Authentication failed') {
    super(message, 401)
  }
}

class AuthorizationError extends CustomError {
  constructor(message = 'Not authorized') {
    super(message, 403)
  }
}

export {
  CustomError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
}
