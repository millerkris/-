const nanoid = require("nanoid");
const {getDb} = require("./db");
const md5 = require('md5');

const TABLE_NAME = "users";

module.exports = {
    TABLE_NAME,
    addUser: async (login, password) => {
        const newUser = {
            login,
            password: md5(password)
        };
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (login, password) VALUES (?, ?)`,
            newUser.login, newUser.password
        );
        newUser.id = result.lastID;
        return newUser;
    },
    getUsers: async () => await getDb().get(`SELECT * FROM ${TABLE_NAME}`),
    getUserByLogin: async (login) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE login = ?`, login),
    getUserById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id),
};