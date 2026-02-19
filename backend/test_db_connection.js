const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: false // User didn't specify SSL requirements, default to false.
});

async function testConnection() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully!');

        console.log('Querying Users table...');
        const result = await client.query('SELECT * FROM "Users" LIMIT 5;'); // Quote "Users" for case sensitivity

        console.log(`Found ${result.rows.length} users:`);
        console.table(result.rows);

        await client.end();
    } catch (err) {
        console.error('Connection error', err.stack);
        if (client) await client.end();
    }
}

testConnection();
