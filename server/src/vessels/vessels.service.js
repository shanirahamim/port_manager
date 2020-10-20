const WsClientsService = require('../../network/wsClients.service');
const constants = require('../common/constants');
const VesselRepository = require('./vessels.repository');

class VesselService {

    constructor() {
        this.vesselRepo = new VesselRepository();
        this.wsClientsService = new WsClientsService();
    }

    getAll = async () => {
        return await this.vesselRepo.getAll()
    }

    arrive = async (veesselsData) => {
        let newVessel = await this.vesselRepo.create(veesselsData);
       
        //this.wsClientsService.notifyClients("new_vessel_arrived", newVessel);
        this.wsClientsService.notifyClients("vessels_updated", await this.getAll());

        return newVessel;
    }
    
    leave = async (veesselsName) => {
        let removed =  await this.vesselRepo.delete(veesselsName);

        if(removed){
            //this.wsClientsService.notifyClients("vessel_left", veesselsName);
            this.wsClientsService.notifyClients("vessels_updated", await this.getAll());
        }else{
            new Error("failed removing vessel");
        }
        return removed;
    }
}

module.exports = VesselService;