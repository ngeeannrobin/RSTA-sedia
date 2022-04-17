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
  bookOutReasons = [
    {code: "MC", emoji: "Ⓜ️", text: " Medical Leave", remarkPlaceholder: "DDMMYY-DDMMYY"},
    {code: "LV", emoji: "❌", text: " Leave", remarkPlaceholder: "DDMMYY(AM/PM)-DDMMYY(AM/PM)"},
    {code: "SO", emoji: "🏯", text: " Stay out", remarkPlaceholder: null},
    {code: "AT", emoji: "🅰️", text: " Attach Out", remarkPlaceholder: "Unit, DDMMYY-DDMMYY"},
    {code: "CS", emoji: "©️", text: " Course", remarkPlaceholder: "Course, DDMMYY-DDMMYY"},        
    {code: "OF", emoji: "🔘", text: " Off", remarkPlaceholder: "DDMMYY(AM/PM)-DDMMYY(AM/PM)"},
    {code: "BO", emoji: "", text: "Company Book out", remarkPlaceholder: null},
    {code: "XX", emoji: "⏺️", text: "Others", remarkPlaceholder: "Reason, DDMMYY-DDMMYY"},
  ];
  selectedReason:any = "";
  bookOutRemark = "";

  constructor(private auth: AuthService, private bibo: BiboService, private gps: GpsService, public dt: DatetimeService) { }

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.bibo.GetLatestBIBO(this.auth.pid).then(data=>{
        this.lastBibo = data;
        this.lastBibo.time = this.dt.ConvertTimestampToDate(this.lastBibo.time);
        console.log(this.lastBibo);
      }).catch(rej=>{
        this.lastBibo = {in: false, time: new Date()};
      })
    });

    // this.CheckPermissionLoop();
    // this.CheckLocation();
  }

  ngOnDestroy(): void {
    this.checking = false;
  }

  Book(bin,rsn,rmk) {
    if (this.auth.pid === undefined) {return;}
    this.dt.GetLocalDate().then(date=>{
      this.bibo.BookV2(bin,date,this.auth.pid,rsn,rmk).then(_=>{
        this.lastBibo.time = date;
        this.lastBibo.in = !this.lastBibo.in;
      })
    })
  }

  BookIn() {
    this.Book(true, null, null);
  }

  BookOut() {
    if (this.selectedReason == "") {
      alert("Pls select book out reason thx.")
    } else if (this.selectedReason.remarkPlaceholder !== null && this.bookOutRemark === ""){
      alert("Pls put remark la pls la pls")
    } else {
      this.Book(false,this.selectedReason.code,this.selectedReason.placeholder===null?null:this.bookOutRemark);
    }
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
