//------------------------------------------------------------------------------------------------
// scope
//------------------------------------------------------------------------------------------------

if ((typeof (scope) === 'undefined') || !scope) {
    var scope = {}
}

scope.register = function () {
    var a = arguments;
    var o = window;
    var i;
    var j;
    var d;

    for (i = 0; i < a.length; i = i + 1) {
        d = ("" + a[i]).split(".");
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }

    return o;
};

scope.isRegistered = function (namespace) {
    var o = window;
    var j;
    var d;

    d = ("" + namespace).split(".");
    for (j = 0; j < d.length; j = j + 1) {
        if (typeof (o[d[j]]) === 'undefined') {
            return false;
        }
        o = o[d[j]];
    }

    return true;
};

scope.getRegistration = function (namespace) {
    var o = window;
    var j;
    var d;

    d = ("" + namespace).split(".");
    for (j = 0; j < d.length; j = j + 1) {
        if (typeof (o[d[j]]) === 'undefined') {
            return null;
        }
        o = o[d[j]];
    }

    return o;
};

scope.define = function (namespace) {
    if (!scope.isRegistered(namespace)) {
        scope.register(namespace);
    }

    var scope_registration = scope.getRegistration(namespace);
    return scope_registration;
};

scope.use = function (scope_registrations, block) {
    if (!scope_registrations) {
        block(window);
    }
    else if (scope_registrations.length == 0) {
        block(window);
    }
    else if (scope_registrations.length == 1) {
        block(scope_registrations[0]);
    }
    else {
        var s_args = scope_registrations;
        var arg = [];
        for (var i = 0; i < s_args.length; i++) {
            arg.push(s_args[i]);
        }

        block.apply(this, arg);
    }

    return block;
};

scope.get = function (scope_registration) {
    return scope_registration;
};

scope.block = function (block) {
    return block();
};

