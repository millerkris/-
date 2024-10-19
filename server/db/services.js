const { getDb } = require("./db");

const TABLE_NAME = "services";

module.exports = {
    getAllServices: async () => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    },
    
    getServiceById: async (id) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id);
    },

    addService: async (name, time, price) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name, time, price) VALUES (?, ?, ?)`,
            name, time, price
        );
        return { id: result.lastID, name, time, price };
    },

    editService: async (id, name, time, price) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET name = ?, time = ?, price = ? WHERE id = ?`,
            name, time, price, id
        );
        return this.getById(id);
    },

    deleteService: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    }
};
