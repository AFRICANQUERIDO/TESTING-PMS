"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        console.log(token);
        if (!token) {
            return res.json({
                message: "Unauthorized: Token not provided",
            });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        // Add the decoded token information to the request object
        req.info = decodedToken;
        next();
    }
    catch (error) {
        // Token verification failed
        console.error('Error verifying token:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.json({
                message: 'Unauthorized: Token has expired',
            });
        }
        return res.json({
            message: 'Unauthorized: Invalid token',
        });
    }
};
exports.verifyToken = verifyToken;
