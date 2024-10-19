const { getDb } = require("./db");

const TABLE_NAME = "masters";

module.exports = {
    getAllMasters: async () => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    },
    
    getMasterById: async (id) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id);
    },

    addMaster: async (name, speciality, experience) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name, speciality, experience) VALUES (?, ?, ?)`,
            name, speciality, experience
        );
        return { id: result.lastID, name, speciality, experience };
    },

    editMaster: async (id, name, speciality, experience) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET name = ?, speciality = ?, experience = ? WHERE id = ?`,
            name, speciality, experience, id
        );
        return this.getById(id);
    },

    deleteMaster: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    }
};
