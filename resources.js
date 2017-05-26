module.exports = {

    ////////////////////////////////////////////////////////////////////////////

    javascripts_app: [
        "./app/src/libraries/**/*.js",
        "./app/src/modules/**/*.js",
        "./app/src/utilities/global.js",
        "./app/src/utilities/**/*.js",
        "./app/src/app.js",
        "./app/src/app-config.js",
        "./app/src/app-run.js",
        "./app/src/factories/**/*.js",
        "./app/src/services/**/*.js",
        "./app/src/controllers/**/*.js",
        "./app/src/directives/**/*.js",
        "./app/src/filters/**/*.js",
    ],

    ////////////////////////////////////////////////////////////////////////////

    stylesheets_app: [
        "./app/style/main.less",
    ],

    ////////////////////////////////////////////////////////////////////////////

    javascripts_lib: [
        "./app/lib/jquery/dist/jquery.min.js",
        "./app/lib/angular/angular.min.js",
        "./app/lib/angular-ui-router/release/angular-ui-router.min.js",
        "./app/lib/angular-recaptcha/release/angular-recaptcha.min.js",
        "./app/lib/persian-date/dist/0.1.8/persian-date-0.1.8.min.js",
        "./app/lib/clipboard/dist/clipboard.min.js",
        "./app/lib/simple-query-string/src/simplequerystring.min.js",

        //"./app/lib/semantic/dist/semantic.min.js",
        "./app/lib/semantic/dist/components/site.min.js",
        "./app/lib/semantic/dist/components/form.min.js",
        "./app/lib/semantic/dist/components/modal.min.js",
        "./app/lib/semantic/dist/components/sidebar.min.js",
        "./app/lib/semantic/dist/components/sticky.min.js",

        "./app/lib/semantic/dist/components/dimmer.min.js",
        "./app/lib/semantic/dist/components/transition.min.js",
    ],

    ////////////////////////////////////////////////////////////////////////////

    stylesheets_lib: [
        //"./app/lib/semantic/dist/semantic.rtl.min.css",
        "./app/lib/semantic/dist/components/site.rtl.min.css",
        "./app/lib/semantic/dist/components/grid.rtl.min.css",
        "./app/lib/semantic/dist/components/form.rtl.min.css",
        "./app/lib/semantic/dist/components/input.rtl.min.css",
        "./app/lib/semantic/dist/components/modal.rtl.min.css",
        "./app/lib/semantic/dist/components/label.rtl.min.css",
        "./app/lib/semantic/dist/components/menu.min.css",
        "./app/lib/semantic/dist/components/button.min.css",
        "./app/lib/semantic/dist/components/sidebar.min.css",
        "./app/lib/semantic/dist/components/sticky.min.css",
        "./app/lib/semantic/dist/components/segment.rtl.min.css",
        "./app/lib/semantic/dist/components/image.min.css",
        "./app/lib/semantic/dist/components/divider.min.css",

        "./app/lib/semantic/dist/components/dimmer.rtl.min.css",
        "./app/lib/semantic/dist/components/transition.min.css",
    ],

    ////////////////////////////////////////////////////////////////////////////

    dynamics: [
        "./app/src/dynamics/**/*.js",

        "./app/lib/pdfjs-dist/build/pdf.min.js",
        "./app/lib/pdfjs-dist/build/pdf.worker.min.js",

        "./app/lib/semantic/dist/components/checkbox.min.js",
        "./app/lib/semantic/dist/components/checkbox.rtl.min.css",
        "./app/lib/semantic/dist/components/card.rtl.min.css",
        "./app/lib/semantic/dist/components/loader.rtl.min.css",
        "./app/lib/semantic/dist/components/dropdown.min.js",
        "./app/lib/semantic/dist/components/dropdown.rtl.min.css",
        "./app/lib/semantic/dist/components/progress.min.js",
        "./app/lib/semantic/dist/components/progress.rtl.min.css",
        "./app/lib/semantic/dist/components/container.rtl.min.css",
        "./app/lib/semantic/dist/components/statistic.min.css",
    ],

    ////////////////////////////////////////////////////////////////////////////

    // Each Item, Just One File (Do not use * widechar or else) :
    views_templates: [
        "./app/view/index.html",
    ]

    ////////////////////////////////////////////////////////////////////////////

};
