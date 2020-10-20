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

    delete = async (name) => {
        return await this.vesselModel.delete(name);
    }

    create = async (vessel) => {
        return await this.vesselModel.create(vessel);
    }
}

module.exports = VesselRepository;