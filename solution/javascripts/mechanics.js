//------------------------------------------------------------------------------------------------
// mechanics
//------------------------------------------------------------------------------------------------

if ((typeof (mechanics) === 'undefined') || !mechanics) {
    var mechanics = {}
}

mechanics.getFuncName = function (func) {
    var m = func.toString().match(/^function\s(\w+)/);
    return m ? m[1] : null;
};

mechanics.getFuncBody = function (func) {
    var m = func.toString().match(/\{([\s\S]*)\}/m)[1];
    return m.replace(/^\s*\/\/.*$/mg, '');
};

mechanics.getFuncArguments = function (func) {
    var m = func.toString().match(/\((.*)\)/)[1];
    m = m.replace(/\s*/g, '');
    return m.split(',');
};

