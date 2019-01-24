//------------------------------------------------------------------------------------------------
// timer
//------------------------------------------------------------------------------------------------

var timer = function () {
    var self = this;

    var isSet = false;

    var delay = null;
    var block = null;

    var intervalID = null;

    var validate = function () {
        if (!isSet) {
            var exception = "Timer must be set first!";
            alert(exception);
            throw exception;
        }
        if (delay === null) {
            var exception = "Parameter delay must be set!";
            alert(exception);
            throw exception;
        }
        if (block === null) {
            var exception = "Parameter block must be set!";
            alert(exception);
            throw exception;
        }
    }

    self.set = function (arg) {
        delay = arg.delay;
        block = arg.block;

        isSet = true;
    }

    self.start = function () {
        validate();

        if (intervalID !== null) {
            var exception = "Timer must be stopped first!";
            alert(exception);
            throw exception;
        }

        intervalID = setInterval(function () {
            block();
        }, delay);
    }

    self.stop = function () {
        validate();

        if (intervalID === null) {
            var exception = "Timer must be started first!";
            alert(exception);
            throw exception;
        }

        clearInterval(intervalID);

        delay = null;
        block = null;
        intervalID = null;
    }

    self.isRunning = function () {
        return (intervalID !== null);
    }
};


var counter = function () {
    var self = this;

    var isSet = false;

    var t = new timer();
    var begin = null;
    var end = null;
    var step = null;
    var delay = null;
    var block = null;

    var count = null;

    var validate = function () {
        if (!isSet) {
            var exception = "Counter must be set first!";
            alert(exception);
            throw exception;
        }
        if (begin === null) {
            var exception = "Parameter begin must be set!";
            alert(exception);
            throw exception;
        }
        if (end === null) {
            var exception = "Parameter end must be set!";
            alert(exception);
            throw exception;
        }
        if (step === null) {
            var exception = "Parameter step must be set!";
            alert(exception);
            throw exception;
        }
        if (delay === null) {
            var exception = "Parameter delay must be set!";
            alert(exception);
            throw exception;
        }
        if (block === null) {
            var exception = "Parameter block must be set!";
            alert(exception);
            throw exception;
        }
    }

    var exec = function (block) {
        if (count == null) {
            count = begin;
        }
        else {
            count += step;
        }

        if (step >= 0) {
            if (count > end) {
                t.stop();
                count = null;
                return;
            }
        }
        else {
            if (count < end) {
                t.stop();
                count = null;
                return;
            }
        }

        block(count);
    }

    self.set = function (arg) {
        begin = arg.begin;
        end = arg.end;
        step = arg.step;
        delay = arg.delay;
        block = arg.block;

        isSet = true;
    }

    self.start = function () {
        validate();

        if (t.isRunning()) {
            var exception = "Counter must be stopped first!";
            alert(exception);
            throw exception;
        }

        t.set({
            delay: delay,
            block: function () {
                exec(block);
            }
        });
        count = null;

        t.start();
    }

    self.stop = function () {
        validate();

        if (!t.isRunning()) {
            var exception = "Counter must be started first!";
            alert(exception);
            throw exception;
        }

        t.stop();
    }

    self.isRunning = function () {
        return t.isRunning();
    }
};

