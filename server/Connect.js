const mysql = require('mysql');

const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'binzhishi515',
    database:'my_admin'
})


module.exports = db;