const nanoid = require("nanoid");
const users = [
    {
        id: nanoid(),
        login: "123",
        password: "123"
    }
];

module.exports = {
    addUser: (login, password) => {
        const newUser = {
            id: nanoid(),
            login,
            password, // TODO: hash
        };
        users.push(newUser);
        return newUser;
    },
    getUsers: () => users,
    getUserByLogin: (login) => users.find(user => user.login === login),
    getUserById: (id) => users.find(user => user.id === id),
};