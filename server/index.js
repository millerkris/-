const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const servicesRouter = require('./routes/services');
const mastersRouter = require('./routes/masters');
const appointmentsRouter = require('./routes/appointments');
const {initDb} = require("./db/db");

const app = express();

// чтобы парсился POST в виде JSON
app.use(express.json());

// чтобы парсились куки
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: "http://localhost:3000" // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/services', servicesRouter);
app.use('/api/masters', mastersRouter);
app.use('/api/appointments', appointmentsRouter);

const port = process.env.PORT || 3001;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
})();
