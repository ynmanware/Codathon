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
var location_service_1 = require('./location.service');
var location_detail_component_1 = require('./location-detail.component');
var LocationsComponent = (function () {
    function LocationsComponent(router, locationService) {
        this.router = router;
        this.locationService = locationService;
        this.addingLocation = false;
    }
    LocationsComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService
            .getLocations()
            .then(function (locations) { return _this.locations = locations; })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    LocationsComponent.prototype.addLocation = function () {
        this.addingLocation = true;
        this.selectedLocation = null;
    };
    LocationsComponent.prototype.close = function (savedLocation) {
        this.addingLocation = false;
        if (savedLocation) {
            this.getLocations();
        }
    };
    LocationsComponent.prototype.delete = function (location, event) {
        var _this = this;
        event.stopPropagation();
        this.locationService
            .delete(location)
            .then(function (res) {
            _this.locations = _this.locations.filter(function (h) { return h !== location; });
            if (_this.selectedLocation === location) {
                _this.selectedLocation = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    LocationsComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    LocationsComponent.prototype.onSelect = function (location) {
        this.selectedLocation = location;
        this.addingLocation = false;
    };
    LocationsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['LocationDetail', { id: this.selectedLocation.id }]);
    };
    LocationsComponent = __decorate([
        core_1.Component({
            selector: 'my-locations',
            templateUrl: 'app/locations.component.html',
            styleUrls: ['app/locations.component.css'],
            directives: [location_detail_component_1.LocationDetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, location_service_1.LocationService])
    ], LocationsComponent);
    return LocationsComponent;
}());
exports.LocationsComponent = LocationsComponent;
//# sourceMappingURL=locations.component.js.map