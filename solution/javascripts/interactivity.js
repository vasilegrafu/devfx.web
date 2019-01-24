//------------------------------------------------------------------------------------------------
// $(selector).on('mousedrag', function(e) { });
//------------------------------------------------------------------------------------------------

(function ($) {
    $.event.special.mousedrag = {
        add: function (handlerObj) {
            var self = this;
            var $self = $(self);

            var userHandlerJoint = false;
            var userHandlerDrag = false;

            var dragStartX = null;
            var dragStartY = null;
            var dragStartLeft = null;
            var dragStartTop = null;
            var dragHandler = handlerObj.handler;

            $self.on('mousedown', function (e) {
                userHandlerJoint = true;
                dragStartX = arguments[0].pageX;
                dragStartY = arguments[0].pageY;
                dragStartLeft = $self.position().left;
                dragStartTop = $self.position().top;
            })
            $self.on('mousemove', function (e) {
                if (userHandlerJoint) {
                    userHandlerDrag = true;
                }
                if (userHandlerDrag) {
                    arguments[0].startX = dragStartX;
                    arguments[0].startY = dragStartY;
                    arguments[0].X = arguments[0].pageX;
                    arguments[0].Y = arguments[0].pageY;
                    arguments[0].deltaX = arguments[0].X - arguments[0].startX;
                    arguments[0].deltaY = arguments[0].Y - arguments[0].startY;
                    arguments[0].startLeft = dragStartLeft;
                    arguments[0].startTop = dragStartTop;
                    arguments[0].left = arguments[0].startLeft + arguments[0].deltaX;
                    arguments[0].top = arguments[0].startTop + arguments[0].deltaY;
                    dragHandler.apply($self, arguments);
                }
            })
            $self.on('mouseup mouseleave', function (e) {
                userHandlerJoint = false;
                userHandlerDrag = false;
            });

            return false;
        },
        remove: function () {
            var self = this;
            var $self = $(self);

            $self.off('mousedown');
            $self.off('mouseup');
            $self.off('mousemove');
            $self.off('mouseleave');

            return false;
        }
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// $(selector).on('touchdrag', function(e) { });
//------------------------------------------------------------------------------------------------

(function ($) {
    $.event.special.touchdrag = {
        add: function (handlerObj) {
            var self = this;
            var $self = $(self);

            var userHandlerJoint = false;
            var userHandlerDrag = false;

            var dragStartX = null;
            var dragStartY = null;
            var dragStartLeft = null;
            var dragStartTop = null;
            var dragHandler = handlerObj.handler;

            $self.on('touchstart', function (e) {
                var touches = e.originalEvent.changedTouches;
                userHandlerJoint = true;
                dragStartX = touches[0].pageX;
                dragStartY = touches[0].pageY;
                dragStartLeft = $self.position().left;
                dragStartTop = $self.position().top;
            })
            $self.on('touchmove', function (e) {
                var touches = e.originalEvent.changedTouches;
                if (userHandlerJoint) {
                    userHandlerDrag = true;
                }
                if (userHandlerDrag) {
                    arguments[0].startX = dragStartX;
                    arguments[0].startY = dragStartY;
                    arguments[0].X = touches[0].pageX;
                    arguments[0].Y = touches[0].pageY;
                    arguments[0].deltaX = arguments[0].X - arguments[0].startX;
                    arguments[0].deltaY = arguments[0].Y - arguments[0].startY;
                    arguments[0].startLeft = dragStartLeft;
                    arguments[0].startTop = dragStartTop;
                    arguments[0].left = arguments[0].startLeft + arguments[0].deltaX;
                    arguments[0].top = arguments[0].startTop + arguments[0].deltaY;
                    dragHandler.apply($self, arguments);
                }
                e.preventDefault();
            })
            $self.on('touchend touchleave', function (e) {
                var touches = e.originalEvent.changedTouches;
                userHandlerJoint = false;
                userHandlerDrag = false;
            });

            return false;
        },
        remove: function () {
            var self = this;
            var $self = $(self);

            $self.off('touchstart');
            $self.off('touchmove');
            $self.off('touchend');
            $self.off('touchleave');

            return false;
        }
    };
})(jQuery);