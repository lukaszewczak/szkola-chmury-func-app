const sql = require('mssql');

module.exports = async function (context, queueItem) {
   

    try {

        const config = {
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            server: process.env.SQL_SERVER,
            database: process.env.SQL_DB,
            options: {
                encrypt: true
            }

        };

        await sql.connect(config);

        context.log('Function connected to sql server');

    } catch (err) {
        console.err(err);
        sql.close();
    }
};