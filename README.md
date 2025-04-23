# ArduinoPiP5
A method for running P5 and Arduino together on a Raspberry Pi using a Node server

Run a P5 sketch from a local Node server on a Raspberry Pi
Serial link is established between P5 and Arduino via the Node server

Setup Instructions:
1 - Install node on the pi

2 - Create a dedicated folder for the project on the Pi with the following structure:
./projectName/
./projectName/public

3 - copy your Arduno file into ./projectName 
The Arduno .ino file should be named 'projectName.ino'
Make sure that the sketch has been uploaded to the arduino

4 - copy 'serialserver.js' to the project folder

5 - Copy your P5 sketch files including 'index.html' to the ./projectName/public folder

6 - Navigate to the project folder you just created

7 - using the node package manager install express, socket.io and serial:
npm install express --save
npm install socket.io --save
npm install serial --save

8 - from the project folder use the terminal to run the serialserver in node as below
node serialserver.js <portname>
where <portname> is the name of the port that your Arduino is connected to.
The portname will probably be /dev/ttyACM0 but you may have to discover the portname by typing 'lusb' from the command line and looking for the Arduino in the list of devices.
If everything has been setup corectly the servier will print a greeting message

9 - open your browser and enter the following in the address bar:
localhost:3000

This should run your P5 sketch in the browser and connect the sketch to the Arduino!!!

Autostart the sketch at startup:
There are several options for autostarting the node server and Chromium browser.

Communication protocol:

Messages between the Arduino and P5 are sent in text form. 
Messages must be sent as strings with a newline character. It is up to you to develop the data exchange prototcol adapted to your needs.
The Arduino code and P5 code should be develped concurrently.








