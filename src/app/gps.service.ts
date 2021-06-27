import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class GpsService {


  // office location
  center: any;

  // radius from office
  threshold: number;

  // radius of earth in metre
  R  = 6371000;

  initialised: boolean = false;

  constructor(private fs: FirestoreService) {
    this.GetData();
  }

  GetLocation(){
    let promise = new Promise<any>(res=>{
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
          res(pos.coords);
        })
      } else {
        res(null);
      }
    })
    return promise;
  }

  // distance in metre
  GetDistanceInMetre(lat1, lon1, lat2, lon2) {
    var dLat = this.deg2rad(lat2-lat1);
    var dLon =  this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = this.R * c;
    return d;
  }

  GetDistance(){
    let promise = new Promise<number>(async res=>{
      while (!this.initialised){
        await this.Delay(100);
      }
      this.GetLocation().then(pos=>{
        let dist = this.GetDistanceInMetre(this.center.lat,this.center.lon,pos.latitude,pos.longitude);
        res(Math.floor(dist));
      })
    })
    return promise;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  GetData(){
    this.fs.GetGpsData().then(data=>{
      this.center = {lat: data.center.latitude, lon: data.center.longitude};
      this.threshold = data.center;
      this.initialised = true;
    })
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
