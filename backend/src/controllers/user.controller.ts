import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { v4 } from 'uuid';
// import { User } from "../interface/User";
import { sqlConfig } from '../config/sql.config';

export const signupUser = async (req: Request, res: Response) => {
    try {
        const { name, email,phone_number, password } = req.body;

        console.log('User Registration:', name, email, phone_number, password);

        if (!password) {
            return res.json({
                error: "Password is required"
            });
        }
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Email is already registered',
            });
        }
        const id = v4();
        const hashed_pwd = await bcrypt.hash(password, 5);
        console.log('Hashed Password:', hashed_pwd);

    
        const pool = await mssql.connect(sqlConfig)

        const userSign = (await pool
            .request()
            .input('user_id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('email', mssql.VarChar, email)
            .input('phone_number', mssql.VarChar, phone_number)
            .input('password', mssql.VarChar, hashed_pwd)
            .execute('registerUser')).rowsAffected;

        console.log('SQL Query Result:', userSign);
        console.log(userSign);

        if (userSign[0] > 0) {
            return res.status(200).json({
                message: 'Account created successfully',
            });
        } else {
            return res.json({ error: 'An error occurred while creating an account' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.json({ error: 'The user account was not created' });
    }

    async function checkIfEmailExists(email: string): Promise<boolean> {
        const pool = await mssql.connect(sqlConfig);

        const result = await pool
            .request()
            .input('email', mssql.VarChar, email)
            .query('SELECT COUNT(*) AS count FROM Users WHERE email = @email');

        return result.recordset[0].count > 0;
    }
};