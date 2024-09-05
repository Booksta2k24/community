class ErrorResponse extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(400, msg);
    }

    static unauthorized(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(401, msg);
    }

    static forbidden(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(403, msg);
    }

    static notFound(msg: string = "Not found"): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(404, msg);
    }

    static internalError(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(500, msg);
    }

    static methodNotAllowed(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(405, msg);
    }

    static notAcceptable(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(406, msg);
    }

    static conflict(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(409, msg);
    }

    static gone(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(410, msg);
    }

    static unprocessableEntity(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(422, msg);
    }

    static tooManyRequests(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(429, msg);
    }

    static serviceUnavailable(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(503, msg);
    }

    static gatewayTimeout(msg: string): ErrorResponse {
        console.log(msg);
        return new ErrorResponse(504, msg);
    }
}

export default ErrorResponse;
