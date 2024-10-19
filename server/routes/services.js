const express = require('express');
const { getAllServices, addService, getServiceById } = require("../db/services");
const servicesRouter = express.Router();

// Получить все услуги
servicesRouter.get("/", async (req, res) => {
    const services = await getAllServices();
    res.status(200).json(services);
});

// Добавить новую услугу
servicesRouter.post("/", async (req, res) => {
    const { name, time, price } = req.body;
    const newService = await addService(name, time, price);
    res.status(201).json(newService);
});

// Получить услугу по ID
servicesRouter.get("/:id", async (req, res) => {
    const service = await getServiceById(req.params.id);
    if (!service) {
        return res.status(404).json({ message: "Услуга не найдена" });
    }
    res.status(200).json(service);
});

module.exports = servicesRouter;
