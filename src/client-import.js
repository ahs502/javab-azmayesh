var global;
try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}
global.global = global;

var clientUtilitiesPath = "../app/src/utilities/";

////////////////////////////////////////////////////////////////////////////////

require(clientUtilitiesPath + "extensions");

require(clientUtilitiesPath + "calendar-converter");

require(clientUtilitiesPath + "persian-number");

require(clientUtilitiesPath + "ValidationSystem");

////////////////////////////////////////////////////////////////////////////////
