
// import dotenv from 'dotenv'
// dotenv.config();



export const sqlConfig = {
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


console.log(sqlConfig);
