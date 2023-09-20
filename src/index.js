const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require('./config/serverConfig');
const { createChannel } = require("./utils/messageQueue");

//const {sendBasicEmail} = require('./services/email-service');

const TicketController = require('./controllers/ticket-controller');

const jobs = require('./utils/job');

const setupAndStartServer = async () => {

    // create the express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();

    app.post('/api/v1/tickets', TicketController.create);
    app.listen(PORT, async () => {

    console.log(`Server started at ${PORT}`);
    //jobs();
    // sendBasicEmail(
    //     'support@admin.com',
    //     'ayush2992@gmail.com',
    //     'This is a testing email',
    //     'Hey, how are you, I hope you like the support'
    // );
      
});
}

setupAndStartServer();