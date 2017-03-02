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
var LocationService = (function () {
    function LocationService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        //private locationsUrl = 'app/locations';  // URL to web api
        // private locationsUrl = 'http://www.mocky.io/v2/57625d1e100000480e8b13d0';  // URL to web api
        //private locationsUrl = 'http://parkingonrent.locationku.com/api/parkingsjsonp';  // URL to web api
        //private locationsUrl = 'http://localhost:5000/api/parkingsjsonp';  // URL to web api
        //private locationsUrl = 'http://10.253.101.34:5000/api/parkings';  
        //private reservationUrl = 'http://10.253.101.34:5000/res/reservations'; 
        this.locationsUrl = 'http://parkingonrent.herokuapp.com/api/parkings';
        this.reservationUrl = 'http://parkingonrent.herokuapp.com/res/reservations';
    }
    LocationService.prototype.getLocations = function () {
        var params = new http_1.URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK');
        return this.http.get(this.locationsUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    LocationService.prototype.getLocation = function (id) {
        var url = this.locationsUrl + "/" + id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LocationService.prototype.save = function (location) {
        if (location._id) {
            return this.put(location);
        }
        return this.post(location);
    };
    LocationService.prototype.saveRes = function (reservation) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.reservationUrl, JSON.stringify(reservation), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LocationService.prototype.deleteRes = function (id) {
        var url = this.reservationUrl + "/" + id;
        return this.http
            .delete(url)
            .toPromise()
            .catch(this.handleError);
    };
    LocationService.prototype.delete = function (location) {
        var url = this.locationsUrl + "/" + location._id;
        return this.http
            .delete(url)
            .toPromise()
            .catch(this.handleError);
    };
    // Add new Location
    LocationService.prototype.post = function (location) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.locationsUrl, JSON.stringify(location), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Location
    LocationService.prototype.put = function (location) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.locationsUrl + "/" + location._id;
        return this.http
            .put(url, JSON.stringify(location), { headers: headers })
            .toPromise()
            .then(function () { return location; })
            .catch(this.handleError);
    };
    LocationService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    LocationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map