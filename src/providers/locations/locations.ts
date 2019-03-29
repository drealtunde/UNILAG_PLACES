import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the LocationsProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationsProvider {

  data: any;

  constructor(public http: Http, public geolocation: Geolocation) {

  }

  load() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    this.applyHaversine();

  }

  applyHaversine() {

    return new Promise(resolve => {

      this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {
        this.geolocation.getCurrentPosition().then((result) => {
          // console.log(result.coords.latitude);
          let usersLocation = {
            lat: result.coords.latitude,
            lng: result.coords.longitude
          };
  
          let locations = data.locations;
      
          locations.map((location) => {
      
            let placeLocation = {
              lat: location.latitude,
              lng: location.longitude
            };
      
            location.distance = this.getDistanceBetweenPoints(
              usersLocation,
              placeLocation,
              'miles'
            ).toFixed(2);
          });
        
          this.data=locations;
  
          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });
  
          resolve(this.data);
        });
  
      });
          
        });
        


        // this.data = this.applyHaversine(data.locations);
        

   
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }
}