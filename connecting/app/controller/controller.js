const SerialPort = require('serialport')
var HID = require('node-hid');
var NodeWebcam = require("node-webcam");
var KeyboardLines = require('node-hid-stream').KeyboardLines;


exports.configSerialPort = async function (req, res) {
    var myDevice
    var productId = 3075
    var vendorId = 7851
    var bar = []

    SerialPort.list().then(ports => {
        ports.forEach(function (port) {
            if (port.manufacturer) {
                var connPort = new SerialPort(port.path, {
                    parser: new SerialPort.parsers.Readline('\r')
                });
                // Barcode scanned
                console.log("the port were you are connected is:", port.path)
                connPort.on('data', function (data) {
                    // Buffer to string
                    var barcode = data.toString().trim();
                    console.log("this the barcdoe scanned", barcode);
                });
            }
        });
    });


    HID.devices().forEach(function (device) {
        if (device.product !== 'Wireless Receiver') {
            console.log("the port were you are connected is:", device.path)
            myDevice = new HID.HID(device.path);
            var characters = new KeyboardLines({ vendorId: vendorId, productId: productId });
            characters.on("data", function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] == '!') {
                        bar.push('1')
                    } else if (data[i] == '@') {
                        bar.push('2')
                    } else if (data[i] == '#') {
                        bar.push('3')
                    } else if (data[i] == '$') {
                        bar.push('4')
                    } else if (data[i] == '%') {
                        bar.push('5')
                    } else if (data[i] == '^') {
                        bar.push('6')
                    } else if (data[i] == '&') {
                        bar.push('7')
                    } else if (data[i] == '*') {
                        bar.push('8')
                    } else if (data[i] == '(') {
                        bar.push('9')
                    } else if (data[i] == ')') {
                        bar.push('0')
                    }
                }
                console.log("your barcode is: ", bar.join(''))
            })
        }
    })

    if (myDevice == null) {
        res.send({ message: "it's a serial comunication" })
    } else {
        res.send({ message: "it's a usb coomunication" })
    }
}

exports.takingImage = async function (req, res) {
    var opts = {
        width: 1280,
        height: 720,
        quality: 100,
        frames: 60,
        delay: 0,
        saveShots: true,
        output: "jpeg",
        device: false,
        callbackReturn: "location",
        verbose: false
    };

    //Creates webcam instance
    var Webcam = NodeWebcam.create(opts);
    //Will automatically append location output type
    Webcam.capture("test_picture", function (err, data) { });

}