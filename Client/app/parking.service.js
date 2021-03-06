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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/Rx');
var ParkingService = (function () {
    function ParkingService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        //private parkingUrl = 'http://www.mocky.io/v2/575fe9c40f0000720ca6b109';  // URL to web api
        //private parkingUrl = 'http://parkingonrent.locationku.com/api/parkingsjsonp';  // URL to web api
        this.parkingUrl = 'http://localhost:5000/api/parkingsjsonp'; // URL to web api
    }
    ParkingService.prototype.getParkings = function () {
        var params = new http_1.URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp.get(this.parkingUrl, { search: params })
            .toPromise()
            .then(function (response) {
            console.log(response.json());
        })
            .catch(function (rejected) {
            console.log(rejected);
        });
    };
    ParkingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], ParkingService);
    return ParkingService;
}());
exports.ParkingService = ParkingService;
//# sourceMappingURL=parking.service.js.map