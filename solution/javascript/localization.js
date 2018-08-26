//------------------------------------------------------------------------------------------------
// translator
//------------------------------------------------------------------------------------------------

if ((typeof (culture) === 'undefined') || !culture) {
    var culture = {}
}

culture.info = 'en-US';


if ((typeof (translator) === 'undefined') || !translator) {
    var translator = {}
}
if ((typeof (translator.storage) === 'undefined') || !translator.storage) {
    translator.storage = {}
}

// translator.set(culture_info, key, text);
// translator.set(key, text);

translator.set = function () {
    var culture_info = null;
    var key = null;
    var text = null;

    if (arguments.length == 2) {
        if ((typeof (culture.info) === 'undefined') || !culture.info) {
            throw "Wrong arguments!";
        }
        culture_info = culture.info;
        key = arguments[0];
        text = arguments[1];
    }
    else if (arguments.length == 3) {
        culture_info = arguments[0];
        key = arguments[1];
        text = arguments[2];
    }
    else {
        throw "Wrong arguments!";
    }

    if ((typeof (translator.storage[culture_info]) === 'undefined') || !translator.storage[culture_info]) {
        translator.storage[culture_info] = {}
    }

    translator.storage[culture_info][key] = text;
};

// translator.search(key, culture_info);
// translator.search(key);

translator.search = function () {
    var key = null;
    var culture_info_info = null;

    if (arguments.length == 1) {
        if ((typeof (culture.info) === 'undefined') || !culture.info) {
            throw "Wrong arguments!";
        }
        key = arguments[0];
        culture_info = culture.info;
    }
    else if (arguments.length == 2) {
        key = arguments[0];
        culture_info = arguments[1];
    }
    else {
        throw "Wrong arguments!";
    }

    if ((typeof (translator.storage[culture_info]) === 'undefined') || !translator.storage[culture_info]) {
        translator.storage[culture_info] = {}
    }
    if ((typeof (translator.storage[culture_info][key]) === 'undefined') || !translator.storage[culture_info][key]) {
        translator.storage[culture_info][key] = null;
    }

    return translator.storage[culture_info][key];
};

// usecases:

//translator.set('en-US', 'test', 'TEST1');
//translator.set('en-GB', 'test', 'TEST2');

//var text1 = translator.search('test', 'en-US');
//var text2 = translator.search('test', 'en-GB');

//var text = translator.search('test');