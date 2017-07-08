(function(global) {

    global.getEnvironmentProperties = getEnvironmentProperties;

    function getEnvironmentProperties() {
        var document = window && window.document;
        var navigator = window && window.navigator;
        var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
        var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
        var vendor = (navigator && navigator.vendor || '').toLowerCase();

        function getVersion(regx, defaultVersion) {
            var match = userAgent.match(regx);
            return match == null ? false : (match[1] || defaultVersion || '');
        }

        var eprop = {};

        eprop.touch = !!document && ('ontouchstart' in window || ('DocumentTouch' in window && document instanceof window.DocumentTouch));

        eprop.firefox = getVersion(/(?:firefox|fxios)\/(\d+)/);
        eprop.ie = getVersion(/(?:msie |trident.+?; rv:)(\d+)/);
        eprop.edge = getVersion(/edge\/(\d+)/);
        eprop.opera = getVersion(/(?:^opera.+?version|opr)\/(\d+)/);
        eprop.safari = getVersion(/version\/(\d+).+?safari/);
        eprop.plantom = getVersion(/phantomjs\/(\d+)/);
        eprop.chrome = !eprop.opera && /google inc/.test(vendor) && getVersion(/(?:chrome|crios)\/(\d+)/);

        eprop.iPad = getVersion(/ipad.+?os (\d+)/);
        eprop.iPhone = !eprop.iPad && getVersion(/iphone(?:.+?os (\d+))?/, 1);
        eprop.iPod = getVersion(/ipod.+?os (\d+)/);
        eprop.iOS = !!(eprop.iPad || eprop.iPhone || eprop.iPod);

        eprop.android = /android/.test(userAgent);
        eprop.androidPhone = eprop.android && /mobile/.test(userAgent);
        eprop.androidTablet = eprop.android && !/mobile/.test(userAgent);

        eprop.windows = /win/.test(appVersion);
        eprop.windowsPhone = eprop.windows && /phone/.test(userAgent);
        eprop.windowsTablet = eprop.windows && !eprop.windowsPhone && /touch/.test(userAgent);

        eprop.mac = /mac/.test(appVersion);
        eprop.linux = /linux/.test(appVersion);
        eprop.blackberry = /blackberry/.test(userAgent) || /bb10/.test(userAgent);

        eprop.mobile = !!(eprop.iPhone || eprop.iPod || eprop.androidPhone || eprop.windowsPhone || eprop.blackberry);
        eprop.tablet = !!(eprop.iPad || eprop.androidTablet || eprop.windowsTablet);
        eprop.desktop = !eprop.mobile && !eprop.tablet;

        eprop.standalone = "standalone" in window.navigator ? window.navigator.standalone : window.matchMedia('(display-mode)').matches ? window.matchMedia('(display-mode: standalone)').matches : false;

        return eprop;
    }

})(global);
