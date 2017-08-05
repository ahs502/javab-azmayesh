var global;
try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}
global.global = global;

const clientUtilitiesPath = "../app/src/utilities/";
const clientDynamicsPath = "../app/src/dynamics/";

////////////////////////////////////////////////////////////////////////////////

require(clientUtilitiesPath + "extensions");
require(clientUtilitiesPath + "calendar-converter");
require(clientUtilitiesPath + "persian-number");
require(clientUtilitiesPath + "ValidationSystem");

require(clientDynamicsPath + "iriran-provinces-and-cities");

////////////////////////////////////////////////////////////////////////////////
