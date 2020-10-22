class WsClientsService{
    clients;
    constructor() {
        if (!WsClientsService.clients) {
            WsClientsService.clients = [];
        }
    }

    getClients = () => {
        return WsClientsService.clients;
    }

    setClient = (socket) => {
        if(!socket.id){
            socket.id= Math.random();
        }
        WsClientsService.clients[socket.id] = socket;   

    }

    removeClient = (socket) => {
        WsClientsService.clients[socket.id] = null;
        delete WsClientsService.clients[socket.id];
    }
    
    notifyClients = async (message, data) => {
        console.log("noif clients fired: ", message, data);
        
        Object.keys( WsClientsService.clients).forEach((key) => {
            
            console.log("notif:" , key);
            WsClientsService.clients[key].emit(message, data);
        });
    }
}

module.exports = WsClientsService;