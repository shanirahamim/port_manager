const constants = require("../src/common/constants");

let data = [
    {
        "name": "Black Pearl",
        "timeIntervalsInTorruga": [
            {
                "start": 160232133200,
                "end": 1603379661975
            },
            {
                "start": 160332133300,
                "end": 160332136300
            }
        ]
    },
    {
        "name": "Jack Sparrow",
        "timeIntervalsInTorruga": [
            {
                "start": 160232133300,
                "end": 160232133322
            }
        ]
    },
    {
        "name": "Davy Jones",
        "timeIntervalsInTorruga": [
            {
                "start": 160232133300,
                "end": 160232133310
            },
            {
                "start": 160232133100
            },
        ]
    }
];

const generateNewId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const formatVessel = (vessel) => {

    vessel.timeIntervalsInTorruga = vessel.timeIntervalsInTorruga || [];

    if (vessel.timeIntervalsInTorruga &&
        vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1] &&
        !vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1].end) {
        vessel.status = constants.VESSEL_STATUSES.DOC_IN_PORT;
    } else {
        vessel.status = constants.VESSEL_STATUSES.OUT;
    }

    vessel.id = generateNewId();
    return vessel;
}

const calcOverLappingVessels = (veesselId, vesselName, start, end) => {
    let allVessels = data; // todo: with a real db: query by status & in between dates
    let overLappingVeeslesToTimeDiff = {};

    end = end?end : Date.now();

    // should query 
    allVessels.forEach((veesel) => {
        // if (veesel.status.name == constants.VESSEL_STATUSES.DOC_IN_PORT.name && veesel.id != veesselId) {
        if (veesel.id != veesselId) {

            if (!overLappingVeeslesToTimeDiff[veesel.id]) {
                overLappingVeeslesToTimeDiff[veesel.id] = {overlap: 0, vesselName: veesel.name};
            }

            let currTime = veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1];

            let totalTimeTogether = calcOverLapTime(start, end, currTime);
            overLappingVeeslesToTimeDiff[veesel.id].overlap += totalTimeTogether;

            if(!currTime.overlap_map){
                currTime.overlap_map = {};
            }

            if(!currTime.overlap_map[veesselId]){
                currTime.overlap_map[veesselId] = {overlap: 0, vesselName: vesselName};
            }

            currTime.overlap_map[veesselId].overlap += totalTimeTogether;
            
            veesel.timeIntervalsInTorruga[veesel.timeIntervalsInTorruga.length - 1] = currTime;
        }
    });

    return overLappingVeeslesToTimeDiff;
}


const calcOverLappingVesselsOverAllTimes = (veesselId, start, end) => {
    let allVessels = data; // todo: with a real db: query by status & in between dates
    let overLappingVeeslesToTimeDiff = {};

    end = end?end : Date.now();

    // should query 
    allVessels.forEach((veesle) => {
        if (veesle.id != veesselId) {
            if (!overLappingVeeslesToTimeDiff[veesle.id]) {
                overLappingVeeslesToTimeDiff[veesle.id] = {overlap: 0, vesselName: veesle.name};
            }

            for (let timeIndex in veesle.timeIntervalsInTorruga) {
                let currTime = veesle.timeIntervalsInTorruga[timeIndex];
                overLappingVeeslesToTimeDiff[veesle.id].overlap += calcOverLapTime(start, end, currTime);
            }

        }
    });

    return overLappingVeeslesToTimeDiff;
}

calcOverLapTime = (start, end, currTime) => {

    // no chance of overlap
    /*if (currTime.end > start || currTime.start > end) {
        return 0;
    }*/

    let startToTake = Math.max(start, currTime.start);
    let endToCalcBy = Math.min(end, currTime.end ? currTime.end : Date.now());

    let timeDiff = endToCalcBy - startToTake;

    if (timeDiff > 0) {       
        return timeDiff;
    }
    return 0;
}

const rearrangeData = () => {
    // first itartion for status init.
    data = data.map((vessel) => {
        return formatVessel(vessel);
    });

    // second itartion for overlapping
    for (let index in data) {

        for (let timeIndex in data[index].timeIntervalsInTorruga) {
            let time = data[index].timeIntervalsInTorruga[timeIndex];

            data[index].timeIntervalsInTorruga[timeIndex].overlap_map = calcOverLappingVesselsOverAllTimes(data[index].id, time.start, time.end);
        }
    }
}

rearrangeData();

const getByName = (name) => {

    return new Promise((resolve, reject) => {
        resolve(data.filter((vessel) => {
            return vessel.name == name
        })[0]);

    });
};

const getById = (id) => {

    return new Promise((resolve, reject) => {
        resolve(data.filter((vessel) => {
            return vessel.id == id
        })[0]);

    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

const deleteByName = (name) => {
    return new Promise((resolve, reject) => {

        if (!name) {
            reject("cant delete without a name");
        }

        data = data.filter((vessel) => {
            return name !== vessel.name;
        });

        resolve(true);
    });
};

const createNew = (newVessel) => {
    return new Promise((resolve, reject) => {
        if (!newVessel) {
            return reject("can create an empty vassel");
        }

        newVessel = formatVessel(newVessel);
        data.push(newVessel);
        resolve(newVessel);
    });
};

const updateById = (id, body) => {
    return new Promise((resolve, reject) => {
        if (!id || !body) {
            return reject("cant update missing params");
        }

        for (let index in data) {

            if (data[index].id == id) {
                data[index] = formatVessel(body);
                return resolve(data[index]);
            }
        }

        reject("veesel not found");
    });
}

module.exports = { getByName, getById, getAll, deleteByName, createNew, updateById, calcOverLappingVessels };