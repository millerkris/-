const express = require('express');
const { getAllMasters, addMaster, getMasterById } = require("../db/masters");
const mastersRouter = express.Router();

// Получить всех мастеров
mastersRouter.get("/", async (req, res) => {
    const masters = await getAllMasters();
    res.status(200).json(masters);
});

// Добавить нового мастера
mastersRouter.post("/", async (req, res) => {
    const { name, speciality, experience } = req.body;
    const newMaster = await addMaster(name, speciality, experience);
    res.status(201).json(newMaster);
});

// Получить мастера по ID
mastersRouter.get("/:id", async (req, res) => {
    const master = await getMasterById(req.params.id);
    if (!master) {
        return res.status(404).json({ message: "Мастер не найден" });
    }
    res.status(200).json(master);
});

module.exports = mastersRouter;
