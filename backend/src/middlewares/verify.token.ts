import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginUserDetails } from "../interface/user";

dotenv.config();

export interface ExtendedUserRequest extends Request {
    info?: loginUserDetails;
}

export const verifyToken = (req: ExtendedUserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string;
        console.log(token);

        if (!token) {
            return res.json({
                message: "Unauthorized: Token not provided",
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

        // Add the decoded token information to the request object
        req.info = decodedToken as loginUserDetails;

        next();
    } catch (error) {
        // Token verification failed
        console.error('Error verifying token:', error);

        if (error instanceof jwt.TokenExpiredError) {
            return res.json({
                message: 'Unauthorized: Token has expired',
            });
        }

        return res.json({
            message: 'Unauthorized: Invalid token',
        });
    }
};


