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

    getById = async (id) => {
        return await this.vesselRepo.getById(id);
    }

    arrive = async (veesselsData) => {
        let veesel = await this.vesselRepo.getByName(veesselsData.name);
       
        if(!veesel){
            // todo: get date from client
            veesselsData.timeIntervalsInTorruga = [{start: Date.now()}]; 

            veesel = await this.vesselRepo.create(veesselsData);
        }else{

            if(veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1].end){
                new Error("veesel had allready been marked");
            }
            veesel.timeIntervalsInTorruga.push({start: Date.now()});
            veesel = await this.vesselRepo.update(veesel);
        }

        //this.wsClientsService.notifyClients("new_vessel_arrived", newVessel);
        this.wsClientsService.notifyClients("vessels_updated", await this.getAll());

        return veesel;
    }
    
    leave = async (veesel, date) => {

        if(!veesel.timeIntervalsInTorruga || veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1].end){
            throw new Error("invalid leave request");
        }

        veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1].end = date;

        let updated =  await this.vesselRepo.update(veesel);

        if(updated){
            //this.wsClientsService.notifyClients("vessel_left", veesselsName);
            this.wsClientsService.notifyClients("vessels_updated", await this.getAll());
        }else{
            throw new Error("failed removing vessel");
        }
        return updated;
    }

    deleteByName = async (veesselsName) => {
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