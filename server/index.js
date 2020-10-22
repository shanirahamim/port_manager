const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const vesselsRouter = require('./src/vessels/vessels.router');
const cors = require('cors')
require('dotenv').config();
const app = express();
app.config = require('./config/index');

app.set('port', app.config.PORT);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.use(morgan('common'));

//CORS Middleware
app.use(cors({ allowedHeaders: 'Content-Type,Authorization'}));

app.get('/', function (req, res) {
    res.send("It works!");
});

app.use('/vessels', vesselsRouter);

app.listen(app.get('port'), () => {
    console.log(`Express Server initialized on port ${app.get('port')}`);
});


const VesselService = require('./src/vessels/vessels.service');
const server = http.createServer(app);

const io = socketIo(server);
const vesselsServiceInstance = new VesselService();

let interval;
let counter = 0;
io.on("connection", async (socket) => {
   vesselsServiceInstance.wsClientsService.setClient(socket);  
    counter++;
    vesselsServiceInstance.wsClientsService.notifyClients("test", "connected watchers:" + counter );


    console.log(`New client connected, ${counter} are now connected`);
    if (interval) {
        clearInterval(interval);
    }
    socket.emit("vessels_updated", await vesselsServiceInstance.getAll() );

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
        vesselsServiceInstance.wsClientsService.removeClient(socket);
        counter--;
        vesselsServiceInstance.wsClientsService.notifyClients("test", "connected watchers:" + counter );
    });
});

server.listen(app.config.WS_PORT, () => console.log(`Listening to WS on port ${app.config.WS_PORT}`));

module.exports = app;