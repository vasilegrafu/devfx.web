//------------------------------------------------------------------------------------------------
// oop
//------------------------------------------------------------------------------------------------

if ((typeof (oop) === 'undefined') || !oop) {
    var oop = {}
}


// class

oop.declare_class = function (block) {
    return block;
};

oop.declare_instance = function (block) {
    return new (block)();
};

oop.declare_singleton = function (block) {
    return scope.block(function () {
        var constructor = function () {
            var singleton_class = oop.declare_class(block);
            return new singleton_class();
        };

        var uniqueInstance = null;
        return {
            getInstance: function () {
                if (!uniqueInstance) {
                    uniqueInstance = constructor();
                }
                return uniqueInstance;
            }
        };
    });
};


// object management - instances

oop.instances = new Array();

oop.construct = function () {
    var a = arguments;
    if(a.length == 1)
    {
        var block = a[0];
        var instance = new block();
        oop.instances.add({uuid: null,  instance: instance });
        return instance;
    }
    if (a.length == 2) {
        var uuid = a[0];
        var block = a[1];
        var instance = new block();
        oop.instances.add({ uuid: uuid, instance: instance });
        return instance;
    }
    return null;
};

oop.instance = function () {
    var a = arguments;
    if (a.length == 1) {
        var arg = a[0];
        if ($.type(arg) === "string") {
            var uuid = arg;
            for (var i = 0; i < oop.instances.length; i++) {
                var pair = oop.instances[i];
                if (pair.uuid === uuid) {
                    return pair.instance;
                }
            }
        }
    }
    return null;
};

oop.dispose = function () {
    var a = arguments;
    if (a.length == 1) {
        var arg = a[0];
        if ($.type(arg) === "object") {
            var instance = arg;
            for (var i = 0; i < oop.instances.length; i++) {
                var pair = oop.instances[i];
                if (pair.instance === instance) {
                    oop.instances.remove(pair);
                }
            }
        }
        if ($.type(arg) === "string") {
            var uuid = arg;
            for (var i = 0; i < oop.instances.length; i++) {
                var pair = oop.instances[i];
                if (pair.uuid === uuid) {
                    oop.instances.remove(pair);
                }
            }
        }
    }
    return null;
};


// class inheritance

oop.extend_class = function (subclass, superclass) {
    var f = function () { };
    f.prototype = superclass.prototype;
    subclass.prototype = new f();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    if (superclass.prototype.constructor == Object.prototype.constructor) {
        superclass.prototype.constructor = superclass;
    }
};


// instance inheritance

oop.extend_instance = function (self, superinstance) {
    for (var i in superinstance) {
        self[i] = superinstance[i];
    }
    for (var i in superinstance.constructor.prototype) {
        self.constructor.prototype[i] = superinstance.constructor.prototype[i];
    }
    return superinstance;
};

oop.include_instance = function (self, instance) {
    return include_instance;
};


// events

oop.delegate = function (callback) {
    var self = this;

    self.callback = callback;

    self.execute = function (arg) {
        self.callback(arg);
    };

    self.equals = function (delegate) {
        return (self.callback === delegate.callback);
    };
};

oop.delegatelist = function () {
    var self = this;

    var _list = [];

    self.add = function (delegate) {
        _list.push(delegate);
    };

    self.remove = function (delegate) {
        for (var i = 0; i < _list.length; i++) {
            if (_list[i].equals(delegate)) {
                _list.splice(i, 1);
                break;
            }
        }
    };

    self.execute = function (arg) {
        for (var i = 0; i < _list.length; i++) {
            _list[i].execute(arg);
        }
    };
};


// callbacks

oop.callbacklist = function () {
    var self = this;

    var _list = [];

    self.add = function (callback) {
        _list.push(callback);
    };

    self.remove = function (callback) {
        for (var i = 0; i < _list.length; i++) {
            if (_list[i] == callback) {
                _list.splice(i, 1);
                break;
            }
        }
    };

    self.execute = function (arg) {
        for (var i = 0; i < _list.length; i++) {
            _list[i](arg);
        }
    };
};


// usecases:

//Model = oop.declare_class(function () {
//    var self = this;

//    self.init = function () {
//    };

//    var value = 0;

//    var valueChangedHandlers = new oop.callbacklist();
//    self.addForValueChanged = function (callback) {
//        valueChangedHandlers.add(callback);
//    };
//    self.removeForValueChanged = function (callback) {
//        valueChangedHandlers.remove(callback);
//    };

//    self.setValue = function (newValue) {
//        if (value != newValue) {
//            value = newValue;
//            valueChangedHandlers.execute(newValue);
//        }
//    };
//});

//View = oop.declare_class(function () {
//    var self = this;

//    self.init = function () {
//    };

//    self.valueChanged = function (arg) {
//    };
//});

//var model = new Model();
//var view1 = new View();
//var view2 = new View();

//model.addForValueChanged(view1.valueChanged);
//model.addForValueChanged(view2.valueChanged);

//model.setValue(1);
//model.setValue(2);

//model.removeForValueChanged(view2.valueChanged);

//model.setValue(1);
//model.setValue(2);


//Model = oop.declare_class(function () {
//    var self = this;

//    self.init = function () {
//    };

//    var value = 0;

//    var valueChangedHandlers = new oop.callbacklist();
//    self.addForValueChanged = function (callback) {
//        valueChangedHandlers.add(callback);
//    };
//    self.removeForValueChanged = function (callback) {
//        valueChangedHandlers.remove(callback);
//    };

//    self.setValue = function (newValue) {
//        if (value != newValue) {
//            value = newValue;
//            valueChangedHandlers.execute(newValue);
//        }
//    };
//});

//View = oop.declare_class(function () {
//    var self = this;

//    self.init = function () {
//    };

//    self.valueChanged = function (arg) {
//    };
//});

//var model = new Model();
//var view1 = new View();
//var view2 = new View();

//model.addForValueChanged(view1.valueChanged);
//model.addForValueChanged(view2.valueChanged);

//model.setValue(1);
//model.setValue(2);

//model.removeForValueChanged(view2.valueChanged);

//model.setValue(1);
//model.setValue(2);


//LoginSuper = oop.declare_class(function (arg1, arg2) {
//    var self = this;

//    var var1 = arg1;
//    var var2 = arg2;

//    self.init = function () {
//    };

//    self.getVar1 = function () {
//        return var1;
//    };

//    self.getVar2 = function () {
//        return var2;
//    };
//});

//LoginSub = oop.declare_class(function (arg1, arg2) {
//    var self = this;
//    var super1 = oop.extend_instance(self, new LoginSuper(arg1, arg2));
//    var super2 = oop.extend_instance(self, new LoginSuper(arg1, arg2));

//    self.init = function () {
//        super1.init();
//    };

//    self.getVar1 = function () {
//        return super1.getVar1();
//    };

//    self.getVar2 = function () {
//        return super1.getVar2();
//    };
//});

//var loginsuper = new LoginSuper("super1", "super2");
//var varsuper1 = loginsuper.getVar1();
//var varsuper2 = loginsuper.getVar2();

//var loginsub = new LoginSub("sub1", "sub2");
//var varsub1 = loginsub.getVar1();
//var varsub2 = loginsub.getVar2();
