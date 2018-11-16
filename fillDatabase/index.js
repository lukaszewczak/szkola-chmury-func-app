const sql = require('mssql');
const config = require('../shared/config');

module.exports = async function (context, queueItem) {
   

    try {
        
        await sql.close();
        await sql.connect(config);
        await sql.query`insert into GithubActivity(Message) values(${queueItem})`

        context.log('Message added to sql server!');

    } catch (err) {
        context.log(err);
        sql.close();
    }
};