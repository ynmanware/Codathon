import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Location } from './location';


@Injectable()
export class ParkingService {

	//private parkingUrl = 'http://www.mocky.io/v2/575fe9c40f0000720ca6b109';  // URL to web api
	
	//private parkingUrl = 'http://parkingonrent.locationku.com/api/parkingsjsonp';  // URL to web api
	
	private parkingUrl = 'http://localhost:5000/api/parkingsjsonp';  // URL to web api

	constructor(private http: Http,
	private jsonp: Jsonp) { }

	getParkings(): Promise<any> {
	
	var params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');	
	
	return this.jsonp.get(this.parkingUrl, { search: params })
				   .toPromise()
				   .then(response => {
				   	 console.log(response.json()); 	
				   })
				   .catch(function(rejected){
      					console.log(rejected);
	  				});
	}
}
