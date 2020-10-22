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

        if (!veesel) {
            // todo: get date from client
            veesselsData.timeIntervalsInTorruga = [{ start: Date.now() }];

            veesel = await this.vesselRepo.create(veesselsData);
        } else {

            if (veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1].end) {
                new Error("veesel had allready been marked");
            }
            veesel.timeIntervalsInTorruga.push({ start: Date.now() });
            veesel = await this.vesselRepo.update(veesel);
        }

        //this.wsClientsService.notifyClients("new_vessel_arrived", newVessel);
        this.wsClientsService.notifyClients("vessels_updated", await this.getAll());

        return veesel;
    }

    leave = async (veesel, date) => {
        if (!veesel.timeIntervalsInTorruga || veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1].end) {
            throw new Error("invalid leave request");
        }
        let lastIndex = veesel.timeIntervalsInTorruga.length - 1;

        veesel.timeIntervalsInTorruga[lastIndex].end = date;

        let newOverLapMap = await this.vesselRepo.calcOverLappingVessels(veesel.id,
            veesel.name,
            veesel.timeIntervalsInTorruga[lastIndex].start,
            veesel.timeIntervalsInTorruga[lastIndex].end);

        if (veesel.timeIntervalsInTorruga[lastIndex].overlap_map) {
            Object.keys(veesel.timeIntervalsInTorruga[lastIndex]).forEach((key) => {
                if (newOverLapMap[key]) {
                    newOverLapMap[key].overlap += veesel.timeIntervalsInTorruga[lastIndex].overlap_map[key].overlap;
                } else {
                    newOverLapMap[key] = veesel.timeIntervalsInTorruga[lastIndex].overlap_map[key];
                }
            });
        }

        veesel.timeIntervalsInTorruga[lastIndex].overlap_map = newOverLapMap;

        let updated = await this.vesselRepo.update(veesel);

        if (updated) {
            this.wsClientsService.notifyClients("vessels_updated", await this.getAll());
        } else {
            throw new Error("failed removing vessel");
        }

        return updated;
    }

    deleteByName = async (veesselsName) => {
        let removed = await this.vesselRepo.delete(veesselsName);

        if (removed) {
            this.wsClientsService.notifyClients("vessels_updated", await this.getAll());
        } else {
            new Error("failed removing vessel");
        }
        return removed;
    }
}

module.exports = VesselService;