//------------------------------------------------------------------------------------------------
// String
//------------------------------------------------------------------------------------------------

if (typeof (String.prototype.contains) === 'undefined') {
    String.prototype.contains = function (item) { return this.indexOf(item) != -1; };
}


//------------------------------------------------------------------------------------------------
// Array
//------------------------------------------------------------------------------------------------

if (typeof (Array.prototype.contains) === 'undefined') {
    Array.prototype.contains = function (value) {
        var i = this.length;
        while (i--) {
            if (this[i] === value) {
                return true;
            }
        }
        return false;
    }
}

if (typeof (Array.prototype.add) === 'undefined') {
    Array.prototype.add = function (value) {
        this.push(value);
    }
}

if (typeof (Array.prototype.remove) === 'undefined') {
    Array.prototype.remove = function (value) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i] === value) {
                this.splice(i, 1);
                return;
            }
        }
    }
}


//------------------------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------------------------

if ((typeof (system) === 'undefined') || !system) {
    var system = {}
}

system.typeInfo = (function typeInfo(global) {
    return function (obj) {
        if (obj === global) {
            return "Global";
        }
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];
    }
})(this);

system.isUndefined = function (arg) {
    return (system.typeInfo(arg) === 'Undefined');
}
system.isNull = function (arg) {
    return (system.typeInfo(arg) === 'Null');
}

system.isGlobal = function (arg) {
    return (system.typeInfo(arg) === 'Global');
}

system.isObject = function (arg) {
    return (system.typeInfo(arg) === 'Object');
}
system.isArray = function (arg) {
    return (system.typeInfo(arg) === 'Array');
}

system.isNumber = function (arg) {
    return (system.typeInfo(arg) === 'Number');
}
system.isString = function (arg) {
    return (system.typeInfo(arg) === 'String');
}
system.isBoolean = function (arg) {
    return (system.typeInfo(arg) === 'Boolean');
}
system.isDate = function (arg) {
    return (system.typeInfo(arg) === 'Date');
}

system.isFunction = function (arg) {
    return (system.typeInfo(arg) === 'Function');
}
