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

        await sql.close();
        await sql.connect(config);
        await sql.query`insert into GithubActivity(Message) values(${queueItem})`

        context.log('Message added to sql server!');

    } catch (err) {
        context.log(err);
        sql.close();
    }
};