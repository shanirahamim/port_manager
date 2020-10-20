const VesselService = require('./vessels.service');
const vesselServiceInstance = new VesselService();

async function getAll(request, response) {
    try{
        let result = await vesselServiceInstance.getAll();
        response.status(200).send(result);
    }catch(ex){
        console.log(ex);
        response.status(500).send(`Something went wrong: ${ex}`);
    }
}

async function arriveAtDoc(request, response) {
    try{
        console.log(request);
        let result = await vesselServiceInstance.arrive(request.body.vessel);
        response.status(200).send(result);
    }catch(ex){
        console.log(ex);
        response.status(500).send(`Something went wrong: ${ex}`);
    }
}

async function leaveDoc(request, response) {
    try{
        console.log(request);
        let result = await vesselServiceInstance.leave(request.body.name);
        response.status(200).send(result);
    }catch(ex){
        console.log(ex);
        response.status(500).send(`Something went wrong: ${ex}`);
    }
}



module.exports = { 
  getAll,
  arriveAtDoc,
  leaveDoc
};
