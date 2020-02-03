const Router = require('Koa-router');
const mysql = require('mysql');

const userAPI = new Router();

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || '';
const password = process.env.DB_PWD || '';
const port = parseInt(process.env.DB_PORT, 10) || 3306;
const database = process.env.DB_SCHEMA || '';

// mysql connection
const connection = mysql.createConnection({
    host, user, password, port, database
});

try {
    connection.connect();
} catch(e) {
    console.error('failed db connected ' + e);
};

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
const findHandler = async (ctx, next) => {
    let data = null;
    const { email, phone } = ctx.request.body;
    console.log({email, phone});
    if (!email && !phone) {
        ctx.status = 200
        ctx.body = {message: '파라미터 전달 실패' };
    } else {
        // const list = await findUserBy({email, phone});
        // console.log('list => ', list);
        let sql = `SELECT * from persons`;
        email && (sql += ` WHERE Email = '${email}'`);
        phone && (sql += ` OR Phone = '${phone}'`);
        console.log(`${sql}`);
        connection.query(sql, (err, rows, fields) => {
            if (err) throw error;
            if (rows) {
                console.log('rows: ', rows);
                data = rows;
                // ctx.status = 200;
                // ctx.body = {message: 'success', rows: rows};
            }
        });
        ctx.status = 200;
        ctx.body = {message: 'success', data: data};
    }
};




// routers
userAPI.post('/find', findHandler);
userAPI.get('/', (ctx, next) => {
    ctx.body = 'home';
});


module.exports = userAPI;
