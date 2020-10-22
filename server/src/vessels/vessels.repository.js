const Vessel = require('./vessels.model');
const constants = require('../common/constants');

class VesselRepository {

    constructor() {
        this.vesselModel = new Vessel();
    }

    getAll = async () => {
        return await this.vesselModel.getAll();
    }


    getByName = async (name) => {
        return await this.vesselModel.getByName(name);
    }

    getById = async (id) => {
        return await this.vesselModel.getById(id);
    }

    delete = async (name) => {
        return await this.vesselModel.delete(name);
    }

    update = async (vessel) => {
        return await this.vesselModel.update(vessel);
    }

    create = async (vessel) => {
        return await this.vesselModel.create(vessel);
    }
}

module.exports = VesselRepository;