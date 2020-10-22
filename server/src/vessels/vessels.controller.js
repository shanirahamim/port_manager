const ResponseContainer = require('../common/ResponseContainer');
const VesselService = require('./vessels.service');
const vesselServiceInstance = new VesselService();

async function getAll(request, response) {
    try{
        let result = await vesselServiceInstance.getAll();
        response.status(200).send(new ResponseContainer(result));
    }catch(ex){
        console.log(ex);
        response.status(500).send(new ResponseContainer(null , `Something went wrong: ${ex}`));
    }
}

async function getById(request, response) {
    try{
        if(!request.params && !request.params.id){
            console.log(request.params);
            response.status(400).send(new ResponseContainer(null , `id not specified`));
            return;
        }

        let result = await vesselServiceInstance.getById(request.params.id);
        response.status(200).send(new ResponseContainer(result));
    }catch(ex){
        console.log(ex);
        response.status(500).send(new ResponseContainer(null , `Something went wrong: ${ex}`));
    }
}


async function arriveAtDoc(request, response) {
    try{
        let result = await vesselServiceInstance.arrive(request.body.vessel);
        response.status(200).send(result);
    }catch(ex){
        console.log(ex);
        response.status(500).send(`Something went wrong: ${ex}`);
    }
}

async function leaveDoc(request, response) {
    try{
        let result = await vesselServiceInstance.leave(request.body.vessel, request.body.date);
        response.status(200).send(result);
    }catch(ex){
        console.log(ex);
        response.status(500).send(`Something went wrong: ${ex}`);
    }
}


module.exports = { 
  getAll,
  getById,
  arriveAtDoc,
  //deleteVessel,
  leaveDoc
};
