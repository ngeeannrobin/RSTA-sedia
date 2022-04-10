import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';
import { DatetimeService } from '../datetime.service';
import { GpsService } from '../gps.service';

@Component({
  selector: 'app-bibo-v2',
  templateUrl: './bibo-v2.component.html',
  styleUrls: ['./bibo-v2.component.css']
})
export class BiboV2Component implements OnInit {
  distance: number;
  distanceStr: string = "xxx";
  checking: boolean = true;
  showlocation: number = 1;
  geolocationPerm = true;
  lastBibo = undefined;
  constructor(private auth: AuthService, private bibo: BiboService, private gps: GpsService, public dt: DatetimeService) { }

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.bibo.GetLatestBIBO(this.auth.pid).then(data=>{
        this.lastBibo = data;
        this.lastBibo.time = this.dt.ConvertTimestampToDate(this.lastBibo.time);
        console.log(this.lastBibo);
      })
    });

    this.CheckPermissionLoop();
    this.CheckLocation();
  }

  ngOnDestroy(): void {
    this.checking = false;
  }

  Book() {
    if (this.auth.pid === undefined) {return;}
    console.log("Getting true date");
    this.dt.GetLocalDate().then(date=>{
      console.log("True date fetched. Posting record.");
      this.bibo.BookV2(!this.lastBibo.in,date,this.auth.pid).then(_=>{
        console.log("Record uploaded. Updating locally.")
        this.lastBibo.time = date;
        console.log(this.lastBibo.in);
        this.lastBibo.in = !this.lastBibo.in;
        console.log(this.lastBibo.in);
        console.log(this.lastBibo);
      })
    })
  }

  async CheckPermissionLoop(){
    while (this.checking) {
      this.CheckPermission();
      await this.Delay(500);
    }
  }

  CheckPermission() {

    if (this.geolocationPerm){
      navigator.permissions.query({name:'geolocation'}).then(res=>{
        if (res.state === "denied") {
          this.showlocation = 2;
          this.geolocationPerm = false;
          // this.AddMessage("Location permission denied. This will not affect your book in process but it will be reflected in the records. Tap to continue.");
        }
      });
    }
  }

  async CheckLocation(){
    while (this.checking){
      this.gps.GetDistance().then(dist=>{
        this.distance = dist;
        if (this.distance<1000){
          this.distanceStr = `${this.distance} m`
        } else {
          this.distanceStr = `${this.distance / 1000} km`
        }
      })
      await this.Delay(5000);
    }
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
