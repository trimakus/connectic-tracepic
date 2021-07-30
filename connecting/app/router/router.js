
const VerifyToken = require('./verifyJwtToken');

module.exports = function (app) {

    const controller = require('../controller/controller.js');


    app.post('/api/connectionService/configSerialPort', controller.configSerialPort);
    app.post('/api/connectionService/takingImage', controller.takingImage);

}
