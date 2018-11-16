module.exports = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DB,
    options: {
        encrypt: true
    }
};