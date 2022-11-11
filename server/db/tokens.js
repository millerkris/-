const nanoid = require("nanoid");
const tokens = [
    {
        userId: "123123123123",
        token: "123412341234",
        createdAt: Date()
    }
];

module.exports = {
    getUserIdByToken: (token) => {
        const foundToken = tokens.find(tokenItem => tokenItem.token === token);
        return foundToken?.userId;
    },
    addToken: (userId) => {
        const token = nanoid();
        tokens.push({
            userId: userId,
            token,
            createdAt: Date()
        });
        return token;
    },
};