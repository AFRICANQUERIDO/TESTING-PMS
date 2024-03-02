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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mssql_1 = __importDefault(require("mssql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sql_config_1 = require("../config/sql.config");
const SECRET_KEY = process.env.SECRET || "d6d57erthseytrets96r67rst76es";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        const user = (yield pool.request()
            .input("email", email)
            .input("password", password)
            .execute("loginUser")).recordset;
        console.log('password:', password);
        console.log('Stored Hash:', user[0].password);
        if (user.length > 0 && (yield bcrypt_1.default.compare(password, user[0].password))) {
            const { email, user_id, isAdmin } = user[0];
            console.log(user[0].user_id);
            const token = jsonwebtoken_1.default.sign({ email, user_id, isAdmin }, SECRET_KEY, {
                expiresIn: '3600s'
            });
            return res.json({
                message: "Logged in successfully",
                token
            });
        }
        else {
            return res.json({
                error: "Incorrect email or password"
            });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.json({
            error: "Internal server error"
        });
    }
});
exports.loginUser = loginUser;
