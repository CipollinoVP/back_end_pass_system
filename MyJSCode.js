const  { Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: '345MF',
    password: '11062002',
    port: 5432,
})

client.connect();