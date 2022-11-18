const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            password TEXT NOT NULL
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            token TEXT NOT NULL
        )`);
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}