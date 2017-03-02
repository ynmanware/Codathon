"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var dashboard_component_1 = require('./dashboard.component');
var locations_component_1 = require('./locations.component');
var location_detail_component_1 = require('./location-detail.component');
var location_service_1 = require('./location.service');
var select_parking_component_1 = require('./select-parking.component');
var register_component_1 = require('./register.component');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Smart City - A Parking Solution';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/landingPage.html',
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                location_service_1.LocationService,
                http_1.JSONP_PROVIDERS
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent, useAsDefault: true },
            { path: '/detail/:id', name: 'LocationDetail', component: location_detail_component_1.LocationDetailComponent },
            { path: '/locations', name: 'Locations', component: locations_component_1.LocationsComponent },
            { path: '/selectParking', name: 'SelectParking', component: select_parking_component_1.SelectParkingComponent },
            { path: '/register', name: 'Register', component: register_component_1.RegisterComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map