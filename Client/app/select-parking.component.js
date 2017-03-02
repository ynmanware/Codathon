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
var router_deprecated_2 = require('@angular/router-deprecated');
var location_service_1 = require('./location.service');
var SelectParkingComponent = (function () {
    function SelectParkingComponent(router, _locationService, _routeParams) {
        this.router = router;
        this._locationService = _locationService;
        this._routeParams = _routeParams;
        this.locationId = _routeParams.params['locationId'];
        this.spaceId = _routeParams.params['spaceId'];
        this.refresh();
    }
    SelectParkingComponent.prototype.ngOnInit = function () { };
    SelectParkingComponent.prototype.refresh = function () {
        var self = this;
        this._locationService.getLocation(this.locationId).then(function (location) {
            for (var i = 0; i < location.spaces.length; i++) {
                if (location.spaces[i]._id == self.spaceId) {
                    self.selectedSpace = location.spaces[i];
                    break;
                }
            }
            self.initialize();
        });
    };
    SelectParkingComponent.prototype.initialize = function () {
        for (var i = 0; i < this.selectedSpace.slots.length; i++) {
            if (!this.selectedSpace.slots[i].status) {
                this.selectedSpace.slots[i].status = "available";
            }
        }
        this.reservation = {};
        this.reservation.client = "Yogesh";
    };
    SelectParkingComponent.prototype.onSelect = function (p) {
        this.reservation.selectedSlot = p;
    };
    SelectParkingComponent.prototype.save = function () {
        var self = this;
        this.reservation.spotId = this.reservation.selectedSlot.id;
        this.reservation.status = "reserved";
        this.reservation.selectedSlot = undefined;
        console.log("Reservation: " + this.reservation);
        this._locationService.saveRes(this.reservation)
            .then(function (result) {
            console.log("result: " + result);
            self.refresh();
        })
            .catch(function (error) { return console.log(error); }); // TODO: Display error message
    };
    SelectParkingComponent.prototype.cancel = function () {
        if (!this.reservation.selectedSlot || this.reservation.selectedSlot.status != "reserved") {
            return;
        }
        var self = this;
        console.log("Reservation: " + this.reservation);
        this._locationService.deleteRes(this.reservation.selectedSlot._id)
            .then(function (result) {
            console.log("result: " + result);
            self.refresh();
        })
            .catch(function (error) { return console.log(error); }); // TODO: Display error message
    };
    SelectParkingComponent.prototype.openNavigationApp = function (s) {
        var cordstr = "" + s.cords[0].lat + "," + s.cords[0].lng;
        var win = window.open("http://maps.google.com?q=" + cordstr + "&daddr=" + cordstr + "&z=15&t=p", '_blank');
        win.focus();
    };
    SelectParkingComponent.prototype.goBack = function () {
        window.history.back();
    };
    SelectParkingComponent = __decorate([
        core_1.Component({
            selector: 'select-parking',
            templateUrl: 'app/select-parking.component.html',
            styleUrls: ['app/select-parking.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_2.Router, location_service_1.LocationService, router_deprecated_1.RouteParams])
    ], SelectParkingComponent);
    return SelectParkingComponent;
}());
exports.SelectParkingComponent = SelectParkingComponent;
//# sourceMappingURL=select-parking.component.js.map