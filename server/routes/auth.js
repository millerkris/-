const express = require('express');
const authRouter = express.Router();
const {getUserByLogin} = require("../db/users");
const {addToken} = require("../db/tokens");

authRouter.post("/", (req, res) => {

    const user = getUserByLogin(req.body.login);

    if (!user) {
        return res.status(404).json({
            message: "Такой пользователь не найден"
        });
    }

    if (user.password !== req.body.password) { // TODO: hash
        return res.status(400).json({
            message: "Пароль неверный"
        });
    }

    const token = addToken(user.id);
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // TODO: to const
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ok: true});
});

authRouter.delete("/", (req, res) => {
});

module.exports = authRouter;