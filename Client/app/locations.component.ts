import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';

import { Location }                from './location';
import { LocationService }         from './location.service';
import { LocationDetailComponent } from './location-detail.component';

@Component({
  selector: 'my-locations',
  templateUrl: 'app/locations.component.html',
  styleUrls:  ['app/locations.component.css'],
  directives: [LocationDetailComponent]
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  selectedLocation: Location;
  addingLocation = false;
  error: any;

  constructor(
    private router: Router,
    private locationService: LocationService) { }

  getLocations() {
    this.locationService
        .getLocations()
        .then(locations => this.locations = locations)
        .catch(error => this.error = error); // TODO: Display error message
  }

  addLocation() {
    this.addingLocation = true;
    this.selectedLocation = null;
  }

  close(savedLocation: Location) {
    this.addingLocation = false;
    if (savedLocation) { this.getLocations(); }
  }

  delete(location: Location, event: any) {
    event.stopPropagation();
    this.locationService
        .delete(location)
        .then(res => {
          this.locations = this.locations.filter(h => h !== location);
          if (this.selectedLocation === location) { this.selectedLocation = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getLocations();
  }

  onSelect(location: Location) {
    this.selectedLocation = location;
    this.addingLocation = false;
  }

  gotoDetail() {
    this.router.navigate(['LocationDetail', { id: this.selectedLocation.id }]);
  }
}


