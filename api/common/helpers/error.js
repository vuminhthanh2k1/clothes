"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopbackError = void 0;
class LoopbackError extends Error {
    status;
    statusCode;
    code;
    constructor(message, status, code) {
        super(message);
        this.status = status;
        this.statusCode = status;
        this.code = code;
    }
}
exports.LoopbackError = LoopbackError;
//# sourceMappingURL=error.js.map