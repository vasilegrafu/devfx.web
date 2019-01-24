//------------------------------------------------------------------------------------------------
// viewstate
//------------------------------------------------------------------------------------------------

if ((typeof (viewstate) === 'undefined') || !viewstate) {
    var viewstate = {}
}


// viewstate.set(key, value);
// viewstate.set(element, key, value);

viewstate.set = function () {
    var element = null;
    var key = null;
    var value = null;

    if (arguments.length == 2) {
        element = document;
        key = arguments[0];
        value = arguments[1];
    }
    else if (arguments.length == 3) {
        element = arguments[0];
        key = arguments[1];
        value = arguments[2];
    }
    else {
        throw "Wrong arguments!";
    }

    if ((typeof (element.storage) === 'undefined') || !element.storage) {
        element.storage = {}
    }
    if ((typeof (element.storage.viewstate) === 'undefined') || !element.storage.viewstate) {
        element.storage.viewstate = {}
    }

    element.storage.viewstate[key] = value;
};


// var value = viewstate.get(key);
// var value = viewstate.get(element, key);

viewstate.get = function (key) {
    var element = null;
    var key = null;

    if (arguments.length == 1) {
        element = document;
        key = arguments[0];
    }
    else if (arguments.length == 2) {
        element = arguments[0];
        key = arguments[1];
    }
    else {
        throw "Wrong arguments!";
    }

    if ((typeof (element.storage) === 'undefined') || !element.storage) {
        element.storage = {}
    }
    if ((typeof (element.storage.viewstate) === 'undefined') || !element.storage.viewstate) {
        element.storage.viewstate = {}
    }
    if ((typeof (element.storage.viewstate[key]) === 'undefined') || !element.storage.viewstate[key]) {
        element.storage.viewstate[key] = null;
    }

    return element.storage.viewstate[key];
};


// var exists = viewstate.exists(key);
// var exists = viewstate.exists(element, key);

viewstate.exists = function () {
    var element = null;
    var key = null;

    if (arguments.length == 1) {
        element = document;
        key = arguments[0];
    }
    else if (arguments.length == 2) {
        element = arguments[0];
        key = arguments[1];
    }
    else {
        throw "Wrong arguments!";
    }

    if ((typeof (element.storage) === 'undefined') || !element.storage) {
        return false;
    }
    if ((typeof (element.storage.viewstate) === 'undefined') || !element.storage.viewstate) {
        return false;
    }
    if ((typeof (element.storage.viewstate[key]) === 'undefined') || !element.storage.viewstate[key]) {
        return false;
    }

    return true;
};


// viewstate.remove(key);
// viewstate.remove(element, key);

viewstate.remove = function () {
    var element = null;
    var key = null;

    if (arguments.length == 1) {
        element = document;
        key = arguments[0];
    }
    else if (arguments.length == 2) {
        element = arguments[0];
        key = arguments[1];
    }
    else {
        throw "Wrong arguments!";
    }

    if (viewstate_storage.exists(element, key)) {
        delete element.storage.viewstate[key];
    }
};


// var exists = viewstate.extract(key);
// var exists = viewstate.extract(element, key);

viewstate.extract = function () {
    var element = null;
    var key = null;

    if (arguments.length == 1) {
        element = document;
        key = arguments[0];
    }
    else if (arguments.length == 2) {
        element = arguments[0];
        key = arguments[1];
    }
    else {
        throw "Wrong arguments!";
    }

    if (viewstate.exists(element, key)) {
        var value = element.storage.viewstate[key];
        delete element.storage.viewstate[key];
        return value;
    }
    return undefined;
};

