var clientUtilitiesPath = "../app/src/utilities/";

var global;
try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}
global.global = global;

////////////////////////////////////////////////////////////////////////////////

// Use the same extensions from client :
require(clientUtilitiesPath + "extensions");
require(clientUtilitiesPath + "calendar-converter");

////////////////////////////////////////////////////////////////////////////////
