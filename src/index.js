const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = async () => {

    // create the express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.listen(PORT, async () => {

    console.log(`Server started at ${PORT}`);
    
    sendBasicEmail(
        'support@admin.com',
        'ayush2992@gmail.com',
        'This is a testing email',
        'Hey, how are you, I hope you like the support'
    );
});
}

setupAndStartServer();