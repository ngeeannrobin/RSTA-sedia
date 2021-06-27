import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';
import { GpsService } from '../gps.service';

@Component({
  selector: 'app-bibo',
  templateUrl: './bibo.component.html',
  styleUrls: ['./bibo.component.css']
})
export class BiboComponent implements OnInit {
  scan: Boolean = false;
  bookingIn: Boolean;
  msg: String = "";
  distance: number;
  distanceStr: string;
  checking: boolean = true;
  constructor(private auth: AuthService, private bibo: BiboService, private router: Router, private gps: GpsService) { }

  ngOnInit(): void {
    this.auth.Init(true);
    this.CheckLocation();
    
  }

  ngOnDestroy(): void {
    this.checking = false;
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
      await this.Delay(3000);
    }

  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  BookIn() {
    this.bookingIn = true;
    this.Scan();
  }
  BookOut() {
    this.bookingIn = false
    this.Scan();
  }


  Scan(){
    this.scan = true;
  }
  Cancel() {
    this.scan = false;
  }

  qrstring($event: any){
    this.scan = false;
    this.msg = "Loading...";
    this.bibo.Book(this.bookingIn,$event).then(data=>{
      if (data.verified){
        this.msg = `Successfully booked ${this.bookingIn?"in":"out"}.`;
      } else if (data.code == 1) {
        this.msg = `Invalid code. Code may have expired.`
      }
    });
  }

}
