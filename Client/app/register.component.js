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
var RegisterComponent = (function () {
    function RegisterComponent(router, zone, locationService, parkingService) {
        this.router = router;
        this.zone = zone;
        this.locationService = locationService;
        this.parkingService = parkingService;
        this.locations = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locationService.getLocations()
            .then(function (locations) { return _this.locations = locations; });
    };
    RegisterComponent.prototype.reset = function () {
        this.spaceDetails = {};
        var rn = Math.floor(Math.random() * (10000 - 1) + 1);
        this.spaceDetails.id = this.location.id + "-space-" + rn;
        this.spaceDetails.name = "Space-" + rn;
        this.spaceDetails.slotsCount = 2;
        this.spaceDetails.owner = "FIS";
    };
    RegisterComponent.prototype.save = function () {
        var _this = this;
        var n = +this.spaceDetails.slotsCount;
        if (n < 0) {
            return;
        }
        if (this.spaceDetails.cords == null) {
            return;
        }
        this.spaceDetails.slots = [];
        for (var i = 0; i < n; i++) {
            this.spaceDetails.slots.push({ "id": "P-" + this.location.id + this.spaceDetails.id + i, "name": "parking-" + i, "status": "available" });
        }
        var name = Math.floor(Math.random() * (10000 - 1) + 1);
        if (this.spaceDetails.name == null) {
            this.spaceDetails.name = "Space-" + name;
        }
        if (this.spaceDetails.id == null) {
            this.spaceDetails.id = "ID-" + name;
        }
        if (!this.location.spaces) {
            this.location.spaces = new Array();
        }
        this.spaceDetails.loc = [this.spaceDetails.cords[0].lat, this.spaceDetails.cords[0].lng];
        this.location.spaces.push(this.spaceDetails);
        var self = this;
        this.locationService
            .save(this.location)
            .then(function (location) {
            _this.location = location; // saved location, w/ id if new
            self.reset();
        })
            .catch(); // TODO: Display error message
    };
    RegisterComponent.prototype.gotoDetail = function (location) {
        this.location = location;
        this.reset();
        var self = this;
        var pos = this.location.center;
        var myLatLng = new google.maps.LatLng(pos[0], pos[1]);
        // General Options
        var mapOptions = {
            zoom: 20,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.RoadMap
        };
        var map = new google.maps.Map(document.getElementById('mapid'), mapOptions);
        // Polygon Coordinates
        var cords = [];
        this.location.spaces[0].cords.forEach(function (cord) {
            cords.push(new google.maps.LatLng(cord.lat, cord.lng));
        });
        // Styling & Controls
        this.myPolygon = new google.maps.Polygon({
            paths: cords,
            draggable: true,
            editable: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        var myPolygon = this.myPolygon;
        myPolygon.setMap(map);
        google.maps.event.addListener(myPolygon.getPath(), "insert_at", function () {
            self.zone.run(function () {
                self.getPolygonCoords();
            });
        });
        google.maps.event.addListener(myPolygon.getPath(), "set_at", function () {
            self.zone.run(function () {
                self.getPolygonCoords();
            });
        });
    };
    RegisterComponent.prototype.getPolygonCoords = function () {
        var myPolygon = this.myPolygon;
        var len = myPolygon.getPath().getLength();
        var htmlStr = "";
        this.spaceDetails.cords = [];
        for (var i = 0; i < len; i++) {
            this.spaceDetails.cords.push({ "lat": myPolygon.getPath().getAt(i).lat(), "lng": myPolygon.getPath().getAt(i).lng() });
            // htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
            htmlStr += "{'lat':" + myPolygon.getPath().getAt(i).lat() + ", 'lng':" + myPolygon.getPath().getAt(i).lng() + "}, ";
        }
        this.spaceDetails.cordsstr = htmlStr;
        console.log("cords: " + htmlStr);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/register.component.html',
            styleUrls: ['app/register.component.css'],
            providers: [http_1.JSONP_PROVIDERS, parking_service_1.ParkingService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, core_1.NgZone, location_service_1.LocationService, parking_service_1.ParkingService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map