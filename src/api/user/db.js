const mysql = require('mysql');
// import mysql from 'promise-mysql';

console.log(process.env.DB_HOST);
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || '';
const password = process.env.DB_PWD || '';
const port = parseInt(process.env.DB_PORT, 10) || 3306;
const database = process.env.DB_SCHEMA || '';

const config = {
    host, user, password, port, database,
    connectTimeout: 3000
};

// mysql connection
// const pool = mysql.createPool(config);
const connection = mysql.createConnection(config);
connection.connect();

module.exports = connection;
// export default pool;
