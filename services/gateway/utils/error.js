

export class ValidationError extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "NOT_VALID";
        this.httpStatusCode = 400;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }

}

export class AuthenticationError extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "AUTHENTICATION_FAILURE";
        this.httpStatusCode = 401;
    }
}


export class NotFoundError extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "NOT_FOUND";
        this.httpStatusCode = 404;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}

export class AccessDenied extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "NOT_ALLOWED";
        this.httpStatusCode = 403;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}

export class ExistError extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "ENTRY_ALREADY_EXIST";
        this.httpStatusCode = 409;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}

export class ErrorMessage extends Error {
    httpStatusCode = "";
    constructor(message) {
        super(message);
        this.name = "INTERNAL_SERVER_ERROR";
        this.httpStatusCode = 500;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}



