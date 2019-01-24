//------------------------------------------------------------------------------------------------
// $.dragger({
//     hscroller: {hscroller},  
//     vscroller: {vscroller}, 
//     draggable: {draggable}
// });
//------------------------------------------------------------------------------------------------

(function ($) {
    $.dragger = function (arg) {
        var $hscroller = $(arg.hscroller);
        var $vscroller = $(arg.vscroller);
        var $draggable = $(arg.draggable);

        var userHandlerJoint = false;
        var userHandlerDrag = false;
        var dragStartX = null;
        var dragStartY = null;
        var hscrollerStartScrollLeft = null;
        var pageStartScrollTop = null;
        var onStart = function (arg) {
            userHandlerJoint = true;
            userHandlerDrag = false;
            dragStartX = arg.pageX;
            dragStartY = arg.pageY;
            hscrollerStartScrollLeft = $hscroller.scrollLeft();
            vscrollerStartScrollTop = $vscroller.scrollTop();
        };
        var onMove = function (arg) {
            if (userHandlerJoint) {
                userHandlerDrag = true;
            }
            if (userHandlerDrag) {
                var hscrollerScrollLeft = hscrollerStartScrollLeft - (arg.pageX - dragStartX);
                $hscroller.scrollLeft(hscrollerScrollLeft);

                var vscrollerScrollTop = vscrollerStartScrollTop - (arg.pageY - dragStartY);
                $vscroller.scrollTop(vscrollerScrollTop);
            }
        }
        var onEnd = function (e) {
            userHandlerJoint = false;
            userHandlerDrag = false;
            dragStartX = null;
            dragStartY = null;
            hscrollerStartScrollLeft = null;
            vscrollerStartScrollTop = null;
        }

        $draggable.on('mousedown', function (e) {
            onStart(arguments[0]);
        });
        $draggable.on('mousemove', function (e) {
            onMove(arguments[0]);
        });
        $draggable.on('mouseup mouseleave', function (e) {
            onEnd(arguments[0]);
        });

        $draggable.on('touchstart', function (e) {
            var touches = e.originalEvent.changedTouches;
            onStart(touches[0]);
        });
        $draggable.on('touchmove', function (e) {
            var touches = e.originalEvent.changedTouches;
            onMove(touches[0]);
            e.preventDefault();
        });
        $draggable.on('touchend touchleave', function (e) {
            var touches = e.originalEvent.changedTouches;
            onEnd(touches[0]);
        });
    };
})(jQuery);