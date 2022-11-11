const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
var cookies = require("cookie-parser");
const {addUser, getUserByLogin, getUserById} = require("./db/users");
const {addToken, getUserIdByToken} = require("./db/tokens");

const app = express();
app.use(express.json());
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.get("/user", (req, res) => {
    console.log(req.cookies);
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

app.post("/user", (req, res) => {

    if (getUserByLogin(req.body.login)) {
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }

    const newUser = addUser(req.body.login, req.body.password);
    res.status(200).json(newUser);
});

app.post("/auth", (req, res) => {

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
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ok: true});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});