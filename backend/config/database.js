import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'english_tochka'
});

export default db;