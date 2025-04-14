# ArduinoPiP5
A method for running P5 and Arduino together on a Raspberry Pi using a Node server

Run a P5 sketch from a local Node server on a Raspberry Pi
Serial link is established between P5 and Arduino via the Node server

Setup Instructions:
1 - Install node, npm and express on ypur Pi
2 - Create a dedicated folder for the project on the Pi with the following structure:
./projectName/
./projectName/public

3 - copy your Arduno file into ./projectName 
The Arduno .ino file should be named 'projectName.ino'
4 - copy 'serialserver.js' to the project folder
5 - Copy your P5 sketch files including 'index.html' to the ./projectName/public folder



