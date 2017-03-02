import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {JSONP_PROVIDERS}  from '@angular/http';

import { DashboardComponent }  from './dashboard.component';
import { LocationsComponent }     from './locations.component';
import { LocationDetailComponent } from './location-detail.component';
import { LocationService }         from './location.service';

import { SelectParkingComponent } from './select-parking.component';
import { RegisterComponent } from './register.component';

@Component({
  selector: 'my-app',

  templateUrl: 'app/landingPage.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    LocationService,
	JSONP_PROVIDERS
  ]
})
@RouteConfig([
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
  { path: '/detail/:id', name: 'LocationDetail', component: LocationDetailComponent },
  { path: '/locations',     name: 'Locations',     component: LocationsComponent },
  { path: '/selectParking', name: 'SelectParking', component: SelectParkingComponent},
  { path: '/register',     name: 'Register',     component: RegisterComponent },
])
export class AppComponent {
  title = 'Smart City - A Parking Solution';
}
