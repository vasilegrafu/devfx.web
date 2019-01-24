//------------------------------------------------------------------------------------------------
// form
//------------------------------------------------------------------------------------------------

if ((typeof (form) === 'undefined') || !form) {
    var form = {}
}


//------------------------------------------------------------------------------------------------
// form.registerAjaxSubmit
//------------------------------------------------------------------------------------------------

form.registerAjaxSubmit = function (arg) {
    if (arguments.length == 0) {
        throw "No argument!";
    }
    else if (arguments.length == 1) { }
    else {
        throw "Too many arguments!";
    }

    var selector = null;
    if ((typeof (arg.selector) !== 'undefined') && (arg.selector !== null)) {
        selector = arg.selector;
    }
    var $form = $(selector);

    var action = null;
    if ((typeof (arg.action) !== 'undefined') && (arg.action !== null)) {
        action = arg.action;
    }

    var to = null;
    if ((typeof (arg.to) !== 'undefined') && (arg.to !== null)) {
        to = arg.to;
    }
    var into = null;
    if ((typeof (arg.into) !== 'undefined') && (arg.into !== null)) {
        into = arg.into;
    }
   
    var beforeSendHandler = null;
    if ((typeof (arg.beforeSendHandler) !== 'undefined') && (arg.beforeSendHandler !== null)) {
        beforeSendHandler = arg.beforeSendHandler;
    }
    var successHandler = null;
    if ((typeof (arg.successHandler) !== 'undefined') && (arg.successHandler !== null)) {
        successHandler = arg.successHandler;
    }
    var errorHandler = null;
    if ((typeof (arg.errorHandler) !== 'undefined') && (arg.errorHandler !== null)) {
        errorHandler = arg.errorHandler;
    }

    var beforeSend = null;
    if ((typeof (arg.beforeSend) !== 'undefined') && (arg.beforeSend !== null)) {
        beforeSend = arg.beforeSend;
    }
    var success = null;
    if ((typeof (arg.success) !== 'undefined') && (arg.success !== null)) {
        success = arg.success;
    }
    var error = null;
    if ((typeof (arg.error) !== 'undefined') && (arg.error !== null)) {
        error = arg.error;
    }
          
    $form.on("submit", function (event) {
        event.preventDefault();

        var messages = [];
        var eventArgs = {};

        messages = [];
        eventArgs = {
            messages: messages,
            cancel: false
        };
        $form.trigger('onsubmit', [eventArgs]);
        if (eventArgs.cancel) {
            var eventArgs = {
                messages: messages
            };
            $form.trigger('oncancel', [eventArgs]);
            return;
        }

        messages = []
        eventArgs = {
            messages: messages,
            cancel: false
        };
        $form.trigger('onvalidate', [eventArgs]);
        if (eventArgs.cancel) {
            eventArgs = {
                messages: messages
            };
            $form.trigger('oncancel', [eventArgs]);
            return;
        }

        var contentType;
        var processData;
        var data;
        if ($form.find('input[type="file"]').length == 0) {
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            processData = true;
            data = $form.serialize()
        }
        else if (window.FormData) {
            contentType = false;
            processData = false;
            data = new window.FormData($form[0]);
        }
        else {
            return;
        }

        $.ajax({
            url: action,
            type: 'POST',
            async: true,
            contentType: contentType,
            dataType: 'html',
            processData: processData,
            cache: false,
            data: data,
            beforeSend: function (jqXHR, settings) {
                if (beforeSendHandler === null) {
                    if (beforeSend === null) { }
                    else {
                        beforeSend(jqXHR, settings);
                    }
                }
                else {
                    beforeSendHandler(jqXHR, settings);
                }
            },
            success: function (data, textStatus, jqXHR) {
                if (successHandler === null) {
                    if (success === null) { }
                    else {
                        success(data, textStatus, jqXHR);
                    }

                    var eventArgs = {
                        data: data,
                        textStatus: textStatus,
                        jqXHR: jqXHR,
                        messages: []
                    };
                    $form.trigger('onsuccess', [eventArgs]);

                    if (to !== null) {
                        $(to).replaceWith(data);
                    }
                    
                    if (into !== null) {
                        $(into).html(data);
                    }
                }
                else {
                    successHandler(data, textStatus, jqXHR);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (errorHandler === null) {
                    if (error === null) { }
                    else {
                        error(jqXHR, textStatus, errorThrown);
                    }

                    var eventArgs = {
                        jqXHR: jqXHR,
                        textStatus: textStatus,
                        errorThrown: errorThrown,
                        messages: []
                    };
                    $form.trigger('onerror', [eventArgs]);
                }
                else {
                    errorHandler(jqXHR, textStatus, errorThrown);
                }
            },
            complete: function (jqXHR, textStatus) {
            }
        });
    });
};


//------------------------------------------------------------------------------------------------
// $(selector).outerform();
// $(selector).outerform(child_selector);
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.outerform = function (selector) {
        if (arguments.length == 0) {
            return this.parents('form');
        }
        else if (arguments.length == 1) {
            return this.parents('form').find(selector);
        }
    };
})(jQuery);

//------------------------------------------------------------------------------------------------
// $(selector).innerform();
// $(selector).innerform(child_selector);
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.innerform = function (selector) {
        if (arguments.length == 0) {
            return this.find('form');
        }
        else if (arguments.length == 1) {
            return this.find('form').find(selector);
        }
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// form.validateBrowserSupport
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.validateBrowserSupport = function (arg) {
        if (this.find('input[type="file"]').length == 0) {
            arg.isValid = true;
            arg.messages = [];
        }
        else if (window.FormData) {
            arg.isValid = true;
            arg.messages = [];
        }
        else {
            arg.isValid = false;
            arg.messages.push("You need a newer browser version to support form submits.");
            arg.messages.push("Minimum browser version needed: IE 10+, Firefox 4.0+, Chrome 7+, Safari 5+, Opera 12+.");
        }
    };
})(jQuery);

