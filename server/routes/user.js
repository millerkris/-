const express = require('express');
const {getUserIdByToken} = require("../db/tokens");
const {getUserByLogin, addUser, getUserById} = require("../db/users");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    const token = req.cookies.token;
    const userId = getUserIdByToken(token);
    if (!userId) {
        res.status(401).json({
            message: "Пользователь не авторизован"
        });
    }

    const user = getUserById(userId);
    res.status(200).json(user);
});

userRouter.post("/", (req, res) => {
    if (getUserByLogin(req.body.login)) {
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }

    const newUser = addUser(req.body.login, req.body.password);
    res.status(200).json(newUser);
});

module.exports = userRouter;