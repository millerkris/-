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

    await db.exec(`
        CREATE TABLE IF NOT EXISTS  services(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            time INTEGER NOT NULL,
            price INTEGER NOT NULL
        )`);  
        
     await db.exec(`
        CREATE TABLE IF NOT EXISTS  masters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            speciality TEXT NOT NULL,
            experience INTEGER NOT NULL
        )`);
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            serviceId INTEGER NOT NULL,
            masterId INTEGER NOT NULL,
            appointmentDate DATETIME NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (serviceId) REFERENCES services(id),
            FOREIGN KEY (masterId) REFERENCES masters(id)
        )`);  

    await db.exec(`
        INSERT INTO services (name, time, price) VALUES 
        ('Маникюр', 60, 1200),
        ('Педикюр', 90, 1500),
        ('Стрижка', 45, 800),
        ('Укладка', 30, 1000),
        ('Маска для лица', 40, 700),
        ('Массаж', 60, 1800)
        ON CONFLICT(name) DO NOTHING;
    `);

    await db.exec(`
        INSERT INTO masters (name, speciality, experience) VALUES 
        ('Анна Иванова', 'Маникюрист', 5),
        ('Егор Петров', 'Парикмахер', 7),
        ('Светлана Смирнова', 'Косметолог', 4),
        ('Ольга Кузнецова', 'Массажист', 6),
        ('Дмитрий Васильев', 'Мастера укладок', 3)
        ON CONFLICT(name) DO NOTHING;
    `);

};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}