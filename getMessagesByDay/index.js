const sql = require('mssql');
const config = require('../shared/config');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.date) {

        let body = {};

        try {
            await sql.close();
            let pool = await sql.connect(config);
            const result = await pool.request()
            .input('date', sql.Date, req.query.date)
            .query('select * from GithubActivity where date = @date');

            body = {
                [req.query.date]: result.recordset
            };
        } catch (err) {
            context.log(err);
            sql.close();
            context.res = {
                status: 500,
                body: `Ther was an error: ${err}`
            };
            return;
        }

        context.res = {
            body
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};