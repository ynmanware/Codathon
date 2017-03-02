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
var location_1 = require('./location');
var location_service_1 = require('./location.service');
var LocationDetailComponent = (function () {
    function LocationDetailComponent(locationService, routeParams, router, zone) {
        this.locationService = locationService;
        this.routeParams = routeParams;
        this.router = router;
        this.zone = zone;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    LocationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = this.routeParams.get('id');
            this.navigated = true;
            this.locationService.getLocation(id)
                .then(function (location) {
                //map code starts here
                _this.location = location;
                var pos = _this.location.center;
                var myLatLng = new google.maps.LatLng(pos[0], pos[1]);
                // General Options
                var mapOptions = {
                    zoom: 17,
                    center: myLatLng,
                    mapTypeId: google.maps.MapTypeId.RoadMap
                };
                var map = new google.maps.Map(document.getElementById('mapid'), mapOptions);
                // Polygon Coordinates
                var self = _this;
                if (_this.location.spaces) {
                    _this.location.spaces.forEach(function (space) {
                        if (space.cords != null) {
                            var cords = [];
                            space.cords.forEach(function (cord) {
                                cords.push(new google.maps.LatLng(cord.lat, cord.lng));
                            });
                            // Styling & Controls
                            var myPolygon = new google.maps.Polygon({
                                paths: cords,
                                draggable: false,
                                editable: false,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35
                            });
                            myPolygon.setMap(map);
                            var marker = new google.maps.Marker({
                                position: cords[0],
                                map: map,
                                title: space.name,
                                label: "P"
                            });
                            myPolygon.addListener('click', function () {
                                self.zone.run(function () {
                                    self.router.navigate(['SelectParking', { 'spaceId': space._id, 'locationId': self.location._id }]);
                                });
                            });
                        }
                    });
                }
                //map code ends here
            });
        }
        else {
            this.navigated = false;
            this.location = new location_1.Location();
        }
    };
    LocationDetailComponent.prototype.save = function () {
        var _this = this;
        this.locationService
            .save(this.location)
            .then(function (location) {
            _this.location = location; // saved location, w/ id if new
            _this.goBack(location);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    LocationDetailComponent.prototype.goBack = function (savedLocation) {
        if (savedLocation === void 0) { savedLocation = null; }
        this.close.emit(savedLocation);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', location_1.Location)
    ], LocationDetailComponent.prototype, "location", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocationDetailComponent.prototype, "close", void 0);
    LocationDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-location-detail',
            templateUrl: 'app/location-detail.component.html',
            styleUrls: ['app/location-detail.component.css']
        }), 
        __metadata('design:paramtypes', [location_service_1.LocationService, router_deprecated_1.RouteParams, router_deprecated_1.Router, core_1.NgZone])
    ], LocationDetailComponent);
    return LocationDetailComponent;
}());
exports.LocationDetailComponent = LocationDetailComponent;
//# sourceMappingURL=location-detail.component.js.map