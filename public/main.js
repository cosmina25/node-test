System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', './app/component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, router_1, component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(component_1.AppComponent, [core_1.provide(core_1.PLATFORM_DIRECTIVES, { useValue: [router_1.ROUTER_DIRECTIVES], multi: true })]);
        }
    }
});
//# sourceMappingURL=main.js.map