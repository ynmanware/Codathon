"use strict";
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);
/*
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
    provide(SEED_DATA,  { useClass: InMemoryDataService })     // in-mem server data
]);
*/
//# sourceMappingURL=main.js.map