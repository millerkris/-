const { getDb } = require("./db");

const TABLE_NAME = "appointments";

module.exports = {
    getAllAppoint: async () => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    },

    getAppointById: async (userId) => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, userId);
    },

    addAppoint: async (userId, serviceId, masterId, appointmentDate) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (userId, serviceId, masterId, appointmentDate) VALUES (?, ?, ?, ?)`,
            userId, serviceId, masterId, appointmentDate
        );
        return { id: result.lastID, userId, serviceId, masterId, appointmentDate };
    },

    editAppoint: async (id, userId, serviceId, masterId, appointmentDate) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET userId = ?, serviceId = ?, masterId = ?, appointmentDate = ? WHERE id = ?`,
            userId, serviceId, masterId, appointmentDate, id
        );
        return this.getById(id);
    },

    deleteAppoint: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    }
};
