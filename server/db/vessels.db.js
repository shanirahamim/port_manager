const constants = require("../src/common/constants");

let data = [
    {
        "name": "Black Pearl",
        "timeIntervalsInTorruga": [
            {
                "start": 1602521300,
                "end": 1602522480
            },
            {
                "start": 1602321300,
                "end": 1602421300
            }
        ]
    },
    {
        "name": "Jack Sparrow",
        "timeIntervalsInTorruga": [
            {
                "start": 1602321300,
                "end": 1602421300
            }
        ]
    },
    {
        "name": "Davy Jones",
        "timeIntervalsInTorruga": [
            {
                "start": 1602321333,
                "end": 1602421321
            },
            {
                "start": 1603117622777
            },
        ]
    }
];

const generateNewId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const formatVessel = (vessel) => {
    if (!vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1].end) {
        vessel.status = constants.VESSEL_STATUSES.DOC_IN_PORT;
    } else {
        vessel.status = constants.VESSEL_STATUSES.OUT;
    }
    vessel.id = generateNewId();
    return vessel;
}

const rearrangeData = () => {

    data = data.map((vessel) => {
        return formatVessel(vessel);
    });
}

rearrangeData();

const getByName = (name) => {

    return new Promise((resolve, reject) => {
        resolve(data.filter((vessel) => {
            return vessel.name == name
        }));

    });
};

const getAll = () => {

    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

const deleteByName = (name) => {
    console.log(name, data);
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
        // todo: check if it didnt arrive allready 
        if (!newVessel) {
            return reject("can create an empty vassel");
        } 

        newVessel = formatVessel(newVessel);
        data.push(newVessel);
        resolve(newVessel);
    });
};

module.exports = { getByName, getAll, deleteByName, createNew };