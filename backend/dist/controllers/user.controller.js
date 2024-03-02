"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
// import { User } from "../interface/User";
const sql_config_1 = require("../config/sql.config");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone_number, password } = req.body;
        console.log('User Registration:', name, email, phone_number, password);
        if (!password) {
            return res.json({
                error: "Password is required"
            });
        }
        const emailExists = yield checkIfEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Email is already registered',
            });
        }
        const id = (0, uuid_1.v4)();
        const hashed_pwd = yield bcrypt_1.default.hash(password, 5);
        console.log('Hashed Password:', hashed_pwd);
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        const userSign = (yield pool
            .request()
            .input('user_id', mssql_1.default.VarChar, id)
            .input('name', mssql_1.default.VarChar, name)
            .input('email', mssql_1.default.VarChar, email)
            .input('phone_number', mssql_1.default.VarChar, phone_number)
            .input('password', mssql_1.default.VarChar, hashed_pwd)
            .execute('registerUser')).rowsAffected;
        console.log('SQL Query Result:', userSign);
        console.log(userSign);
        if (userSign[0] > 0) {
            return res.status(200).json({
                message: 'Account created successfully',
            });
        }
        else {
            return res.json({ error: 'An error occurred while creating an account' });
        }
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.json({ error: 'The user account was not created' });
    }
    function checkIfEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool
                .request()
                .input('email', mssql_1.default.VarChar, email)
                .query('SELECT COUNT(*) AS count FROM Users WHERE email = @email');
            return result.recordset[0].count > 0;
        });
    }
});
exports.signupUser = signupUser;
