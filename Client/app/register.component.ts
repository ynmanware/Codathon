import { Component, OnInit, NgZone } from '@angular/core';
import { Router }           from '@angular/router-deprecated';
import {JSONP_PROVIDERS}  from '@angular/http';

import { Location, Space }        from './location';
import { LocationService } from './location.service';
import { ParkingService } from './parking.service';

declare var google: any;

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/register.component.html',
  styleUrls:  ['app/register.component.css'],
  providers: [JSONP_PROVIDERS, ParkingService]
})

export class RegisterComponent implements OnInit {

  locations: Location[] = [];
  location: Location;
  
  spaceDetails: any;

  myPolygon: any;
  
  constructor(
    private router: Router,
	private zone: NgZone,
    private locationService: LocationService,
	private parkingService: ParkingService) {
  }

  ngOnInit() {
    this.locationService.getLocations()
      .then(locations => this.locations = locations);
  }
  
  reset() {
  	this.spaceDetails = {};
	
	var rn = Math.floor(Math.random() * (10000 - 1) + 1);
	
	this.spaceDetails.id = this.location.id + "-space-" + rn;
	this.spaceDetails.name = "Space-" + rn;
	this.spaceDetails.slotsCount = 2;
	this.spaceDetails.owner = "FIS";
  }
  
  save() {
  
  	var n = +this.spaceDetails.slotsCount;
	
	if(n < 0){
	  return;
	}
	
	if(this.spaceDetails.cords == null){
	  return;
	}
	
	this.spaceDetails.slots = [];
	
	for(var i=0; i< n; i++){
		this.spaceDetails.slots.push({"id": "P-" + this.location.id + this.spaceDetails.id + i, "name": "parking-" + i, "status": "available"})
	}
	
	var name = Math.floor(Math.random() * (10000 - 1) + 1);
	
	if(this.spaceDetails.name == null){
		this.spaceDetails.name = "Space-" + name;
	}
	
	if(this.spaceDetails.id == null){
		this.spaceDetails.id = "ID-" + name;
	}
	
	if(!this.location.spaces){
		this.location.spaces = new Array<Space>();
	}
	
	this.spaceDetails.loc = [this.spaceDetails.cords[0].lat, this.spaceDetails.cords[0].lng];
	
	this.location.spaces.push(this.spaceDetails);
	
	var self = this;
	this.locationService
        .save(this.location)
        .then(location => {
          this.location = location; // saved location, w/ id if new
		  self.reset();
        })
        .catch(); // TODO: Display error message
  }

  gotoDetail(location: Location) {
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
  var map = new google.maps.Map(document.getElementById('mapid'),mapOptions);
  
  // Polygon Coordinates
  var cords: any[] = [];
	this.location.spaces[0].cords.forEach(function(cord){
		cords.push(new google.maps.LatLng(cord.lat,cord.lng));
	})
  
 
  // Styling & Controls
  
  this.myPolygon = new google.maps.Polygon({
    paths: cords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  
  var myPolygon = this.myPolygon;

  myPolygon.setMap(map);
 	
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", function() {
					self.zone.run(function() {
						self.getPolygonCoords();
					 });
				   });
	
  google.maps.event.addListener(myPolygon.getPath(), "set_at", function() {
					self.zone.run(function() {
						self.getPolygonCoords();
					 });
				   }); 	

  }
  
  getPolygonCoords() {
  var myPolygon = this.myPolygon
  var len = myPolygon.getPath().getLength();
  var htmlStr = "";
  this.spaceDetails.cords = [];
  
  for (var i = 0; i < len; i++) {
    this.spaceDetails.cords.push({"lat": myPolygon.getPath().getAt(i).lat(), "lng": myPolygon.getPath().getAt(i).lng()});
	
	// htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
	  htmlStr += "{'lat':" + myPolygon.getPath().getAt(i).lat() + ", 'lng':" + myPolygon.getPath().getAt(i).lng() + "}, ";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  
  this.spaceDetails.cordsstr = htmlStr; 
  console.log("cords: " + htmlStr);
}
}