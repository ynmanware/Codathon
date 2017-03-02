import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router-deprecated';
import {JSONP_PROVIDERS}  from '@angular/http';

import { Location }        from './location';
import { LocationService } from './location.service';
import { ParkingService } from './parking.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  providers: [JSONP_PROVIDERS, ParkingService]
})
export class DashboardComponent implements OnInit {

  locations: Location[] = [];

  constructor(
    private router: Router,
    private locationService: LocationService,
	private parkingService: ParkingService) {
  }

  ngOnInit() {
    this.locationService.getLocations()
      .then(locations => this.locations = locations);
  }

  gotoDetail(location: Location) {
    let link = ['LocationDetail', { id: location._id }];
    this.router.navigate(link);
  }
}