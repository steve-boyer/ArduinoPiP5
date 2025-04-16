// simple socket and serial server
//
// Create a folder named P5
// Create a new folder under P5 with the name of your project
// Place this file in that folder as well as the Arduino sketch that you want to synch to
// Create a folder named 'public' and place your P5 sketch in the public folder
// Place index.html in the public folder
// in order to use you must install node.js follow the instructions on the node.js website
// open the terminal and navigate to your sketch folder.
// using the Node Package Manager (npm) do the following in the terminal://
// npm init
// npm install express --save
// npm install socket.io --save
// npm install serialport --save
// 
// node server.js <portname> 
// the server shouldnow be running on your computer
// open a browser window and type in the address localhost:3000
// your sketch should now be running in the browser
// upload the arduino sketch to your arduino
// Watch the magic happen!
//
// by Steve Boyer
// California State Unoversity Long Beach
// based in part on Dan Schiffman's websocket videos

// express
var express = require('express');
var app = express();

// monitor port 3000
var server = app.listen(3000);

// socket.io
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

// serialport
var {
    SerialPort
} = require('serialport');

// the following line allows you to specify your port name in the terminal command line
// replace your device name in the example below. On a mac it will look like the below
// on a pc it will be COMx where x is the number of the port:
// > node serialserver.js /dev/cu.usbmodem14201
let portName = process.argv[2];
// the address here must match your Arduino port.
// It's possible to communicate with multiple Arduinos by opening a port for each one.
var myPort = new SerialPort({
    path: portName,
    baudRate: 115200
});

// This pipes the serial stream into a parser that sends the 'data' message
// only after a '\r\n' has been received. This allows for line by line parsing.
// '\r\n\' is a carriage return/linefeed pair which ends every message sent by the Serial.println() method.
// This version of the server expects messages to come in line by line.
const { ReadlineParser } = require('@serialport/parser-readline');
const parser = myPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))
// When a complete message has been received, call the 'sendData' method:
parser.on('data', sendData )


// When a new Serial connection is detected (an 'open' message is received), call the 'openMsg' method
myPort.on("open", openMsg);
function openMsg() {
    console.log('connected to:' + myPort.path );
}
// we don't use this because the parser is intercepting the 'data' message
//myPort.on('data', sendData);

// callback from the parser when it receives a complete line
// pass the data received from the serialport back out to the websocket using io.emit
function sendData(data) {
    console.log( "Data read :" + data );
    io.emit('fromArduino', data);
}
// direct express to access your 'public' folder
app.use(express.static('public'));

// a greeting!
console.log("Hello, Mr. Boyer. Fine day, isn't it?"); // JavaScript Document


// received a new socket connection callback
function newConnection(socket) {
    console.log('new connection :' + socket.id);

    socket.on('toArduino', safeMsg);

    function safeMsg(data) {
        var outByte = data;
        myPort.write(outByte.toString());
        console.log("Message sent: " + data);
    }
}
