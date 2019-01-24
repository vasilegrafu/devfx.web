//------------------------------------------------------------------------------------------------
// validation
//------------------------------------------------------------------------------------------------

if ((typeof (validation) === 'undefined') || !validation) {
    var validation = {}
}

validation.rule = oop.declare_class(function (block, hint) {
    var self = this;

    self.block = block;
    self.hint = hint;

    self.validate = function () {
        self.isValid = self.block();
        self.isValidated = true;
    };
    self.isValidated = false;

    self.isValid = false;
});

validation.rules = {};
validation.rules.requireCondition = function (condition, notTrueMessage) {
    var validationRule = null;
    if (condition instanceof Function) {
        validationRule = new validation.rule(function () {
            return condition();
        }, notTrueMessage);
    }
    else {
        validationRule = new validation.rule(function () {
            return condition;
        }, notTrueMessage);
    }
    return validationRule;
};

validation.sequence = oop.declare_class(function () {
    var self = this;

    self.rules = new Array();

    self.add = function (validationRule /* type: validation.rule */) {
        self.rules.push(validationRule);
    };

    self.requireCondition = function (condition, notTrueMessage) {
        self.add(validation.rules.requireCondition(condition, notTrueMessage));
    };
});

validation.pool = oop.declare_class(function () {
    var self = this;

    self.rules = new Array();

    self.add = function (validationRule /* type: validation.rule */) {
        self.rules.push(validationRule);
    };

    self.validate = function () {
        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            validationRule.validate();
        };
    };
    self.isValidated = function () {
        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            if (!validationRule.isValidated) {
                return false;
            };
        };
        return true;
    };

    self.areValid = function () {
        if (!self.isValidated) {
            self.validate();
        }

        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            if (!validationRule.isValid) {
                return false;
            };
        }
        return true;
    };

    self.hints = function () {
        var hints = new Array();
        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            hints.push(validationRule.hint);
        }
        return hints;
    };

    self.validRules = function () {
        if (!self.isValidated) {
            self.validate();
        }

        var validRules = new Array();
        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            if (validationRule.isValid) {
                validRules.push(validationRule);
            };
        }
        return validRules;
    };
    self.invalidRules = function () {
        if (!self.isValidated) {
            self.validate();
        }

        var invalidRules = new Array();
        for (var i = 0; i <= (self.rules.length - 1) ; i++) {
            var validationRule = self.rules[i];
            if (!validationRule.isValid) {
                invalidRules.push(validationRule);
            };
        };
        return invalidRules;
    };

    self.sequence = function (validationSequence /* type: function (seq) { } or validation.sequence */) {
        if (validationSequence instanceof Function) {
            var seq = new validation.sequence();
            validationSequence(seq);
            validationSequence = seq;
        }

        for (var i = 0; i <= (validationSequence.rules.length - 1) ; i++) {
            var validationRule = validationSequence.rules[i];
            if (!validationRule.isValidated) {
                validationRule.validate();
            };

            if (!validationRule.isValid) {
                self.rules.push(validationRule);
                break;
            };
        };
    };

    self.requireCondition = function (condition, notTrueMessage) {
        self.add(validation.rules.requireCondition(condition, notTrueMessage));
    };
});

// usecases:

//var validationPool = new validation.pool();
//validationPool.sequence(function (seq) {
//    seq.requireCondition(false, '1');
//    seq.requireCondition(false, '2');
//});