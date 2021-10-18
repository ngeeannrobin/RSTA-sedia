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
  booked: Boolean = false;
  scan: Boolean = false;
  manual: Boolean = false;
  bookingIn: Boolean;
  msg: String = "";
  msgBox: String = null;
  msgBoxList: Array<String> = [];
  distance: number;
  distanceStr: string = "xxx";
  checking: boolean = true;
  loading: boolean = false;
  useCamera: boolean = false;
  showlocation: number = 1;
  permission: any = {
    geolocation: true,
    camera: true
  }

  constructor(private auth: AuthService, private bibo: BiboService, private gps: GpsService) { }

  ngOnInit(): void {
    this.auth.Init(true);
    this.CheckPermissionLoop();


    this.CheckLocation();
    
  }

  ngOnDestroy(): void {
    this.checking = false;
  }


  async CheckPermissionLoop(){
    while (this.checking) {
      this.CheckPermission();
      await this.Delay(500);
    }
  }


  CheckPermission() {

    if (this.permission.geolocation){
      navigator.permissions.query({name:'geolocation'}).then(res=>{
        if (res.state === "denied") {
          this.showlocation = 2;
          this.permission.geolocation = false;
          this.AddMessage("Location permission denied. This will not affect your book in process but it will be reflected in the records. Tap to continue.");
        }
      });
    }

    if (this.permission.camera){
      navigator.permissions.query({name:'camera'}).then(res=>{
        if (res.state === "denied") {
          this.permission.camera = false;
          this.useCamera = false;
          this.scan = false;
          this.AddMessage("Camera permission denied. You can still enter the code manually but that is troublesome :) Tap to continue.");
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
      await this.Delay(500);
    }
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  AddMessage(msg:String){
    this.msgBoxList.push(msg);
    if (this.msgBox === null){
      this.msgBox = this.msgBoxList.shift();
    }
  }

  BookIn() {
    this.bookingIn = true;
    this.msg = "";
    if (this.useCamera)
      this.Scan();
    else
      this.Manual();
  }
  BookOut() {
    this.bookingIn = false
    this.msg = "";
    if (this.useCamera)
      this.Scan();
    else
      this.Manual();
  }

  Manual() {
    this.scan = false;
    this.manual = true;
    this.showlocation = 0;
  }
  Scan(){
    this.manual = false;
    this.scan = true;
    this.showlocation = 0;
  }
  Cancel() {
    this.scan = false;
    this.showlocation = 1;
  }

  code($event: string){
    this.manual = false
    if ($event !== null){
      this.msg = "Loading...";
      this.Book(this.bookingIn,$event);
    } else {
      this.showlocation = 1;
    }
  }

  qrstring($event: string){
    this.scan = false;
    this.msg = "Loading...";
    this.Book(this.bookingIn,$event.replace("rsta-sedia.web.app/c/",""));
  }

  error($event: string){
    this.Cancel();
    this.msg = $event;
  }

  Book(bookingIn:Boolean,code:string){
    this.loading = true;
    this.bibo.Book(bookingIn,code).then(data=>{
      this.booked = data.verified;
      if (data.verified){
        this.msg = `Successfully booked ${this.bookingIn?"in":"out"}.`;
      } else {
        if (data.code == 1) {
          this.msg = `Invalid code. Code may have expired.`;
        }
        this.showlocation = 1;
      }
      this.loading = false;
    }).catch(err=>{
      this.msg = `An error has occured. idk what or why hehe. ${err}`;
    })
  }

  DismissMessage(){
    if (this.msgBoxList.length == 0 ) {
      this.msgBox = null;
    } else {
      this.msgBox = this.msgBoxList.shift();
    }
  }
}
