import {
	Component,
	Input,
	OnInit
}
from '@angular/core';
import {
	RouteParams
}
from '@angular/router-deprecated';
import {
	Router
}
from '@angular/router-deprecated';

import {
	Location
}
from './location';
import {
	LocationService
}
from './location.service';

 @ Component({
	selector : 'select-parking',
	templateUrl : 'app/select-parking.component.html',
	styleUrls : ['app/select-parking.component.css']
})

export class SelectParkingComponent implements OnInit {
	selectedSpace : any;
	locations : any;
	selected : any;
	reservation : any;

	locationId : string;
	spaceId : string;

	constructor(private router : Router,
		private _locationService : LocationService,
		private _routeParams : RouteParams) {

		this.locationId = _routeParams.params['locationId'];
		this.spaceId = _routeParams.params['spaceId'];
		this.refresh();
	}

	ngOnInit() {}

	refresh() {
		var self = this;
		this._locationService.getLocation(this.locationId).then(location => {
				for (var i = 0; i < location.spaces.length; i++) {
					if (location.spaces[i]._id == self.spaceId) {
						self.selectedSpace = location.spaces[i];
						break;
					}
				}
				self.initialize();
			})
	}

	initialize() {
		for (var i = 0; i < this.selectedSpace.slots.length; i++) {
			if (!this.selectedSpace.slots[i].status) {
				this.selectedSpace.slots[i].status = "available";
			}
		}
		this.reservation = {};
		this.reservation.client = "Yogesh";
	}

	onSelect(p : any) {
		this.reservation.selectedSlot = p;
	}

	save() {
		var self = this;
		this.reservation.spotId = this.reservation.selectedSlot.id;
		this.reservation.status = "reserved";
		this.reservation.selectedSlot = undefined;
		console.log("Reservation: " + this.reservation);
		
		 this._locationService.saveRes(this.reservation)
        .then(result => {
          console.log("result: " + result);
		  self.refresh();
        })
        .catch(error => console.log(error)); // TODO: Display error message
	}
	
	cancel() {
		if(!this.reservation.selectedSlot || this.reservation.selectedSlot.status != "reserved"){
			return;
		}
		var self = this;
		console.log("Reservation: " + this.reservation);
		 this._locationService.deleteRes(this.reservation.selectedSlot._id)
        .then(result => {
          console.log("result: " + result);
		  self.refresh();
        })
        .catch(error => console.log(error)); // TODO: Display error message
	}

	openNavigationApp(s : any) {
		var cordstr = "" + s.cords[0].lat + "," + s.cords[0].lng;
		var win = window.open("http://maps.google.com?q=" + cordstr + "&daddr=" + cordstr + "&z=15&t=p", '_blank');
		win.focus();
	}

	goBack() {
		window.history.back();
	}
}