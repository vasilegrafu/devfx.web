//------------------------------------------------------------------------------------------------
// router
//------------------------------------------------------------------------------------------------

if ((typeof (router) === 'undefined') || !router) {
    var router = {}
}


// redirectTo

router.redirectTo = function (url) {
    window.location.href = url;
};


// reload

router.reload = function () {
    window.location.reload();
};
