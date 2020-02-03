const Router = require('Koa-router');
// const connection = require('./db');
// import pool from './db';

const mysql      = require('mysql');
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || '';
const password = process.env.DB_PWD || '';
const port = parseInt(process.env.DB_PORT, 10) || 3306;
const database = process.env.DB_SCHEMA || '';

const config = {
    host, user, password, port, database
};

var connection = mysql.createConnection(config);
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) console.log(error);
    console.log('The solution is: ', results[0].solution);
});



const userAPI = new Router();



async function findUserBy({ email, phone }) {
    let data = null;
    let sql = `SELECT * from persons`;
    email && (sql += ` WHERE Email = '${email}'`);
    phone && (sql += ` OR Phone = '${phone}'`);
    console.log(`sql => ${sql}`);
    connection.query(sql, (err, rows, fields) => {
        err && console.log(`err => `, err);
        if (rows) {
            console.log('rows: ', rows);
            return rows;
        }
        // connection.end();
    });
    console.log('data: ', data);
    return data;
}


// handlers
const findHandler = async (ctx) => {
    const { email, phone } = ctx.request.body;
    console.log({email, phone});
    if (!email && !phone) {
        ctx.status = 200;
        ctx.body = { message: '파라미터 검증 실패' };
    } else {
        // let sql = "SELECT * from persons WHERE Email = ? OR Phone = ?";
        // connection.query.then(function(err, rows) {
        //     console.log(rows);
        // });

        ctx.status = 200;
        ctx.body = {message: 'success'};
    }
};




// routers
userAPI.post('/find', findHandler);
userAPI.get('/', (ctx, next) => {
    ctx.body = 'home';
});


module.exports = userAPI;
