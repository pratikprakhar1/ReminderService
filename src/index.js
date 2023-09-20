const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require('./config/serverConfig');
const {subscribeMessage , createChannel } = require("./utils/messageQueue");

const {REMINDER_BINDING_KEY} = require('./config/serverConfig')
const EmailService = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');

const jobs = require('./utils/job');

const setupAndStartServer = async () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();

    app.post('/api/v1/tickets', TicketController.create);
    app.listen(PORT, async () => {

    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    console.log(`Server started at ${PORT}`);
    jobs();
      
});
};

setupAndStartServer();