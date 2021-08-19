class ClientError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 400;
        this.name = "ClientError";
        this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    }
}

class AuthenticationError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 401;
        this.name = "AuthenticationError";
        this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    }
}


class NotFoundError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 404;
        this.name = "NotFoundError";
        this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    }
}

class DatabaseError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 503;
        this.name = "DatabaseError";
        this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    }
}

class AuthorizationError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 403;
        this.name = "AuthorizationError";
        this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    ClientError,
    DatabaseError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError
}