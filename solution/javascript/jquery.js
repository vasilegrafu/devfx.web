//------------------------------------------------------------------------------------------------
// $id, $class
//------------------------------------------------------------------------------------------------

var $id = function (id) {
    return $('#' + id);
};

var $class = function (classname) {
    return $('.' + classname);
};


//------------------------------------------------------------------------------------------------
// $().findBy();
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.findById = function (id) {
        return this.find('*[id="' + id + '"]');
    };
})(jQuery);

(function ($) {
    $.fn.findByPrefixId = function (prefixId) {
        return this.find('*[id^="' + prefixId + '"]');
    };
})(jQuery);

(function ($) {
    $.fn.findByPostfixId = function (postfixId) {
        return this.find('*[id$="' + postfixId + '"]');
    };
})(jQuery);

(function ($) {
    $.fn.findByTag = function (tag) {
        return this.find(tag);
    };
})(jQuery);

(function ($) {
    $.fn.findByClass = function (_class) {
        return this.find('.' + _class);
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// $().inner();
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.inner = function () {
        return this.children();
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// $().copyTo(selector);
// $().copyInto(selector);
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.copyTo = function (selector) {
        return $(selector).replaceWith(this);
    };
})(jQuery);

(function ($) {
    $.fn.copyInto = function (selector) {
        return $(selector).empty().append(this);
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// $().moveTo(selector);
// $().moveInto(selector);
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.moveTo = function (selector) {
        return $(selector).replaceWith(this.detach());
    };
})(jQuery);

(function ($) {
    $.fn.moveInto = function (selector) {
        return $(selector).empty().append(this.detach());
    };
})(jQuery);


//------------------------------------------------------------------------------------------------
// $().into(selector);
// $().appendInto(selector);
//------------------------------------------------------------------------------------------------

(function ($) {
    $.fn.into = function (selector) {
        return $(selector).empty().append(this);
    };
})(jQuery);

(function ($) {
    $.fn.appendInto = function (selector) {
        return $(selector).append(this);
    };
})(jQuery);