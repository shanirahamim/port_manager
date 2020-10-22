'use strict';
const vesselDb = require('./../../db/vessels.db');

class Vessel {

    async getAll() {
        return await vesselDb.getAll();
    }
    
    async getById(id) {
        return await vesselDb.getById(id);
    }

    
    async getByName(name) {
        return await vesselDb.getByName(name);
    }

    async delete(name) {
        return await vesselDb.deleteByName(name);
    }

    async update(vessel) {
        return await vesselDb.updateById(vessel.id, vessel);
    }

    async create(vessel) {
        return await vesselDb.createNew(vessel);
    }
}

module.exports = Vessel;