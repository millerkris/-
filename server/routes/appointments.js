const express = require('express');
const { getUserIdByToken } = require("../db/tokens");
const { getAppointmentsByUserId, addAppointment, deleteAppointment } = require("../db/appointments");
const appointmentsRouter = express.Router();

// Получить все записи текущего пользователя
appointmentsRouter.get("/", async (req, res) => {
    const token = req.cookies.token;
    const userId = await getUserIdByToken(token);
    if (!userId) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const appointments = await getAppointmentsByUserId(userId);
    res.status(200).json(appointments);
});

// Создать новую запись на услугу
appointmentsRouter.post("/", async (req, res) => {
    const { serviceId, masterId, appointmentDate } = req.body;
    const token = req.cookies.token;
    const userId = await getUserIdByToken(token);
    if (!userId) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const newAppointment = await addAppointment(userId, serviceId, masterId, appointmentDate);
    res.status(201).json(newAppointment);
});

// Удалить запись по ID
appointmentsRouter.delete("/:id", async (req, res) => {
    const appointmentId = req.params.id;
    await deleteAppointment(appointmentId);
    res.status(204).send();
});

module.exports = appointmentsRouter;