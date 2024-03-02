"use strict";
// import dotenv from 'dotenv'
// dotenv.config();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
exports.sqlConfig = {
    user: 'sa',
    password: 'sql.jane',
    database: 'PMS',
    server: 'DESKTOP-G3PNO3V',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
console.log(exports.sqlConfig);
