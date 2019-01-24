(function ($, window) {
    var elements = $([])

    $.event.special.resize = {
        setup: function () {
            var isWindow = (window === this);
            if (isWindow) {
                return false;
            }

            var element = $(this);

            elements = elements.add(element);

            element.data("resize", { w: element.width(), h: element.height() });

            if (elements.length === 1) {
                loop();
            }
        },

        teardown: function () {
            var isWindow = (window === this);
            if (isWindow) {
                return false;
            }

            var element = $(this);

            elements = elements.not(element);
            element.removeData("resize");

            if (!elements.length) {
                clearloop();
            }
        },

        add: function (handleObj) {
            var isWindow = (window === this);
            if (isWindow) {
                return false;
            }

            var old_handler = handleObj.handler;

            handleObj.handler = function (e, w, h) {
                var element = $(this);
                var data = $.data(this, "resize");

                data.w = (typeof (w) !== 'undefined') ? w : element.width();
                data.h = (typeof (h) !== 'undefined') ? h : element.height();

                return old_handler.apply(this, arguments);
            };
        }
    };

    var update = function () {
        elements.each(function () {
            var element = $(this);
            var width = element.width();
            var height = element.height();
            var data = $.data(this, "resize");

            if (width !== data.w || height !== data.h) {
                element.trigger("resize", [data.w = width, data.h = height]);
            }
        });
    };

    var timeout_id = null;
    function loop() {
        timeout_id = window.setTimeout(function () {
            update();
            loop();
        }, 16);
    };
    function clearloop() {
        if (timeout_id !== null) {
            clearTimeout(timeout_id);
            timeout_id = null;
        }
    };

    $(window).resize(function () {
        update();
    });
})(jQuery, window);
