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
var location_service_1 = require('./location.service');
var parking_service_1 = require('./parking.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, locationService, parkingService) {
        this.router = router;
        this.locationService = locationService;
        this.parkingService = parkingService;
        this.locations = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locationService.getLocations()
            .then(function (locations) { return _this.locations = locations; });
    };
    DashboardComponent.prototype.gotoDetail = function (location) {
        var link = ['LocationDetail', { id: location._id }];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard.component.html',
            styleUrls: ['app/dashboard.component.css'],
            providers: [http_1.JSONP_PROVIDERS, parking_service_1.ParkingService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, location_service_1.LocationService, parking_service_1.ParkingService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map