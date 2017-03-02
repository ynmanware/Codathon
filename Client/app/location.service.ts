import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';


import { Location } from './location';

@Injectable()
export class LocationService {

  //private locationsUrl = 'app/locations';  // URL to web api
  
  // private locationsUrl = 'http://www.mocky.io/v2/57625d1e100000480e8b13d0';  // URL to web api
	
	//private locationsUrl = 'http://parkingonrent.locationku.com/api/parkingsjsonp';  // URL to web api
	
	//private locationsUrl = 'http://localhost:5000/api/parkingsjsonp';  // URL to web api
	
	//private locationsUrl = 'http://10.253.101.34:5000/api/parkings';  
	//private reservationUrl = 'http://10.253.101.34:5000/res/reservations'; 
	
	private locationsUrl = 'http://parkingonrent.herokuapp.com/api/parkings'; 
	private reservationUrl = 'http://parkingonrent.herokuapp.com/res/reservations'; 
	
	constructor(private http: Http, private jsonp: Jsonp) { }

  getLocations(): Promise<Location[]> {
  	var params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');	
   
    return this.http.get(this.locationsUrl)
               .toPromise()
               .then(function(response){
			   	return response.json();
			   })
               .catch(this.handleError);
  }


  getLocation(id: string) {
  
  	let url = `${this.locationsUrl}/${id}`;
	
	return this.http
               .get(url)
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }

  save(location: Location): Promise<Location>  {
    if (location._id) {
      return this.put(location);
    }
    return this.post(location);
  }

  saveRes(reservation: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.reservationUrl, JSON.stringify(reservation), {headers: headers})
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }

  deleteRes(id: string) {
    let url = `${this.reservationUrl}/${id}`;

    return this.http
               .delete(url)
               .toPromise()
               .catch(this.handleError);
  }

  delete(location: Location) {
    let url = `${this.locationsUrl}/${location._id}`;

    return this.http
               .delete(url)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Location
  private post(location: Location): Promise<Location> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.locationsUrl, JSON.stringify(location), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Location
  private put(location: Location) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

	let url = `${this.locationsUrl}/${location._id}`;

    return this.http
               .put(url, JSON.stringify(location), {headers: headers})
               .toPromise()
               .then(() => location)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}