//------------------------------------------------------------------------------------------------
// script
//------------------------------------------------------------------------------------------------

if ((typeof (script) == 'undefined') || !script) {
    var script = {}
}

script.load = function (arg) {
    var cache = true;
    if ((typeof (arg.cache) != 'undefined') && (arg.cache !== null)) {
        cache = arg.cache;
    }

    var count = arg.urls.length;
    for (i = 0; i < arg.urls.length; i++) {
        (function () {
            var k = i;
            jQuery.ajax({
                type: "GET",
                data: undefined,
                dataType: "script",
                url: arg.urls[k],
                async: arg.async,
                cache: cache,
                success: function (data, textStatus, jqXHR) {
                    count--;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        })();
    }

    if (count == 0) {
        if ((typeof (arg.success) != 'undefined') && (arg.success !== null)) {
            arg.success();
        }
    }
    else {
        if ((typeof (arg.error) != 'undefined') && (arg.error !== null)) {
            arg.error();
        }
    }
};

script.loadSync = function (arg) {
    arg.async = false;
    script.load(arg);
};

script.loadAsync = function (arg) {
    arg.async = true;
    script.load(arg);
};

