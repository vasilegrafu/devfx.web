//------------------------------------------------------------------------------------------------
// ajax
//------------------------------------------------------------------------------------------------

if ((typeof (ajax) === 'undefined') || !ajax) {
    var ajax = {}
}

//------------------------------------------------------------------------------------------------
// ajax.getErrorMessage
//------------------------------------------------------------------------------------------------
ajax.getErrorMessage = function (jqXHR, textStatus, errorThrown) {
    var error_message = null;
    if (jqXHR.status === 0) {
        error_message = 'Cannot connect to the server.';
    } else if (jqXHR.status == 404) {
        error_message = '[404]: Requested resource not found.';
    } else if (jqXHR.status == 500) {
        error_message = '[500]: Internal server error.';
    } else if (textStatus === 'timeout') {
        error_message = '[timeout]: Request timed out.';
    } else if (textStatus === 'abort') {
        error_message = '[abort]: Request aborted.';
    } else if (textStatus === 'parsererror') {
        error_message = '[parsererror]: Parsing JSON request failed.';
    } else if (textStatus === 'error') {
        error_message = '[error]: An error occurred.';
    } else {
        error_message = 'Unhandled error.';
    }

    if (jqXHR.responseText) {
        error_message += '\n' + jqXHR.responseText;
    }

    return error_message;
};

//------------------------------------------------------------------------------------------------
// ajax.call
//------------------------------------------------------------------------------------------------

ajax.call = function (arg) {
    var from = null;
    if ((typeof (arg.from) !== 'undefined') && (arg.from !== null)) {
        from = arg.from;
    }

    var type = 'GET';
    if ((typeof (arg.type) !== 'undefined') && (arg.type !== null)) {
        type = arg.type;
    }

    var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    if ((typeof (arg.contentType) !== 'undefined') && (arg.contentType !== null)) {
        contentType = arg.contentType;
    }

    var data = null;
    if ((typeof (arg.data) !== 'undefined') && (arg.data !== null)) {
        data = arg.data;
    }

    var dataType = null;
    if ((typeof (arg.dataType) !== 'undefined') && (arg.dataType !== null)) {
        dataType = arg.dataType;
    }

    var async = true;
    if ((typeof (arg.async) !== 'undefined') && (arg.async !== null)) {
        async = arg.async;
    }

    var cache = false;
    if ((typeof (arg.cache) !== 'undefined') && (arg.cache !== null)) {
        cache = arg.cache;
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

    $.ajax({
        url: from,
        type: type,
        contentType: contentType,
        data: data,
        dataType: dataType,
        async: async,
        cache: cache,
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
            }
            else {
                errorHandler(jqXHR, textStatus, errorThrown);
            }
        },
        complete: function (jqXHR, textStatus) {
        }
    });
};


//------------------------------------------------------------------------------------------------
// ajax.getHtml
//------------------------------------------------------------------------------------------------

ajax.getHtml = function (arg) {
    arg.dataType = 'html';

    var successHandler = null;
    if ((typeof (arg.successHandler) !== 'undefined') && (arg.successHandler !== null)) {
        successHandler = arg.successHandler;
    }

    var success = null;
    if ((typeof (arg.success) !== 'undefined') && (arg.success !== null)) {
        success = arg.success;
    }

    var to = null;
    if ((typeof (arg.to) !== 'undefined') && (arg.to !== null)) {
        to = arg.to;
    }

    var into = null;
    if ((typeof (arg.into) !== 'undefined') && (arg.into !== null)) {
        into = arg.into;
    }

    if (successHandler === null) {
        arg.successHandler = function (data, textStatus, jqXHR) {
            if (success === null) { }
            else {
                success(data, textStatus, jqXHR);
            }

            if (to !== null) {
                $(to).replaceWith(data);
            }

            if (into !== null) {
                $(into).html(data);
            }
        };
    }

    ajax.call(arg);
};


//------------------------------------------------------------------------------------------------
// ajax.getJson
//------------------------------------------------------------------------------------------------

ajax.getJson = function (arg) {
    arg.dataType = 'json';

    var successHandler = null;
    if ((typeof (arg.successHandler) !== 'undefined') && (arg.successHandler !== null)) {
        successHandler = arg.successHandler;
    }

    var success = null;
    if ((typeof (arg.success) !== 'undefined') && (arg.success !== null)) {
        success = arg.success;
    }

    var result = null;
    if ((typeof (arg.result) !== 'undefined') && (arg.result !== null)) {
        result = arg.result;
    }

    if (successHandler === null) {
        arg.successHandler = function (data, textStatus, jqXHR) {
            if (success === null) { }
            else {
                success(data, textStatus, jqXHR);
            }

            if (result !== null) {
                result(data);
            }
        };
    }

    ajax.call(arg);
};


//------------------------------------------------------------------------------------------------
// ajax.getFile({
//     url: {url},
//     data: {
//         property1: {property1},
//         property2: {property2}
//     }
// });
//------------------------------------------------------------------------------------------------

ajax.getFile = function (arg) {
    function getUrlParams(prefix, object) {
        var urlParameters = '';
        var count = 0;
        for (var objectPropertyName in object) {
            if (object.hasOwnProperty(objectPropertyName)) {
                if (count > 0) {
                    urlParameters += '&';
                }
                var objectPropertyFullName = ((prefix == null) ? '' : (prefix + '.')) + objectPropertyName;
                var objectPropertyValue = object[objectPropertyName];
                if (system.isArray(objectPropertyValue)) {
                    var icount = 0;
                    for (var i = 0; i < objectPropertyValue.length; i++) {
                        if (icount > 0) {
                            urlParameters += '&';
                        }
                        urlParameters += (encodeURIComponent(objectPropertyFullName) + '[]=' + encodeURIComponent(objectPropertyValue[i]));
                        icount++;
                    }
                } else if (system.isObject(objectPropertyValue)) {
                    urlParameters += getUrlParams(objectPropertyFullName, objectPropertyValue);
                }
                else {
                    if (objectPropertyValue === null) {
                        objectPropertyValue = '';
                    }
                    urlParameters += (encodeURIComponent(objectPropertyFullName) + '=' + encodeURIComponent(objectPropertyValue));
                }
                count++;
            }
        }
        return urlParameters;
    };

    var url = null;
    if ((typeof (arg.url) !== 'undefined') && (arg.url !== null)) {
        url = arg.url;
    }
    var data = null;
    if ((typeof (arg.data) !== 'undefined') && (arg.data !== null)) {
        data = arg.data;
    }

    var iframe = null;;
    var iframeId = '_EDD7E95A6F474ECCB4B29954C59B7BC7';
    iframe = document.getElementById(iframeId);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.style.visibility = 'none';
        iframe.style.visibility = 'hidden';
        document.body.appendChild(iframe);
    }
    iframe.src = (url + (!url.contains('?') ? '?' : '&') + getUrlParams(null, data));
}