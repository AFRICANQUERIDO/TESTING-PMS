import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import mssql from 'mssql';
import jwt from 'jsonwebtoken';
import { sqlConfig } from "../config/sql.config";


const SECRET_KEY = process.env.SECRET || "d6d57erthseytrets96r67rst76es";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input("email", email)
            .input("password", password)
            .execute("loginUser")).recordset;

        console.log('password:', password);
        console.log('Stored Hash:', user[0].password);

        if (user.length > 0 && await bcrypt.compare(password, user[0].password)) {
            const { email, user_id, isAdmin } = user[0];
            console.log(user[0].user_id)

            const token = jwt.sign({ email, user_id, isAdmin }, SECRET_KEY, {
                expiresIn: '3600s'
            });

            return res.json({
                message: "Logged in successfully",
                token
            });
        } else {
            return res.json({
                error: "Incorrect email or password"
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.json({
            error: "Internal server error"
        });
    }
};