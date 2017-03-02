import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Location }        from './location';
import { LocationService } from './location.service';

declare var google: any;

@Component({
  selector: 'my-location-detail',
  templateUrl: 'app/location-detail.component.html',
  styleUrls: ['app/location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  @Input() location: Location;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private locationService: LocationService,
    private routeParams: RouteParams,
	private router: Router,
	private zone: NgZone) {
  }

  ngOnInit() {
  
    if (this.routeParams.get('id') !== null) {
      let id = this.routeParams.get('id');
      this.navigated = true;
      this.locationService.getLocation(id)
          .then(location => {
		  //map code starts here
		this.location = location

		var pos = this.location.center;

	  var myLatLng = new google.maps.LatLng(pos[0], pos[1]);
	  // General Options
	  var mapOptions = {
		zoom: 17,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.RoadMap
	  };
	  var map = new google.maps.Map(document.getElementById('mapid'),mapOptions);
	  
	  // Polygon Coordinates
	  var self = this;
	   
	  if(this.location.spaces){
	  	this.location.spaces.forEach(function(space){
			if(space.cords != null){
					var cords: any[] = [];
					space.cords.forEach(function(cord){
						cords.push(new google.maps.LatLng(cord.lat,cord.lng));
					})

				  // Styling & Controls
				  var myPolygon = new google.maps.Polygon({
					paths: cords,
					draggable: false, // turn off if it gets annoying
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
				  	
				  myPolygon.addListener('click', function() {
					self.zone.run(function() {
						self.router.navigate(['SelectParking', {'spaceId': space._id, 'locationId': self.location._id}]);
					 });
				   });
				}
			})
		  }
		  		  
		  //map code ends here
		  });
    } else {
      this.navigated = false;
      this.location = new Location();
    }
  }

 save() {
    this.locationService
        .save(this.location)
        .then(location => {
          this.location = location; // saved location, w/ id if new
          this.goBack(location);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
 
 goBack(savedLocation: Location = null) {
    this.close.emit(savedLocation);
    if (this.navigated) { window.history.back(); }
  }
}
