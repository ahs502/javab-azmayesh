var global;

try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}

global.global = global;
