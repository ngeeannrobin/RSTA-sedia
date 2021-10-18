import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-bibo',
  templateUrl: './admin-bibo.component.html',
  styleUrls: ['./admin-bibo.component.css']
})
export class AdminBiboComponent implements OnInit {

  constructor(private admin:AdminService, private auth:AuthService) { }
  
  selectedPlt: Number;
  bookIn: Number = -1;
  temp = {
    bookIn: true,
    reason: {
      code: "MC",
      remark: ""
    }
  };
  pltData: Array<any> = [];

  // [CODE, DISPLAY TEXT]
  bookOutReasons: Array<Array<string>> = [
    ["MC","Ⓜ️ Medical Leave"],
    ["LV","❌ Leave"],
    ["SO","🏯 Stay out"],
    ["AT","🅰️ Attach Out"],
    ["CS","©️ Course"],
    ["OF","🔘 Off"],
    ["BO"," Company Book out"],
    ["XX","⏺️ Others"]
  ];
  strength: number;
  moJi: string;
  reason: any = {
    code: undefined,
    remark: ""
  };
  done = false;
  loadingEmoji = "🔜";
  sub: Subscription;

  ngOnInit(): void {
    this.auth.Init(true);
  }

  ngOnDestroy(): void {
    if (this.sub!==undefined){
      this.sub.unsubscribe();
    }
    
  }

  SelectPlatoon($event){
    this.sub = this.admin.GetPlatoonBibo($event).subscribe(change=>{
      this.selectedPlt=$event;
      this.pltData = change;
      this.strength = this.CountStrength();
    });
  }

  SelectReason(code: string){
    this.temp.reason.code = code;
  }

  SelectBookIn(bin: boolean){
    this.temp.bookIn = bin;
  } 

  FinaliseSelectBookIn(){
    this.bookIn = this.temp.bookIn?1:0;
    if (this.temp.bookIn) {
      this.reason.code="";
      this.moJi = "✅"
    }
  }

  FinaliseSelectReason(){
    this.reason = this.temp.reason;
    this.bookOutReasons.forEach(r => {
      if (r[0]===this.temp.reason.code){
        this.moJi = r[1].split(" ")[0]||" ";
        return;
      }
    });
    
  }

  CountStrength(){
    let strength = 0;
    this.pltData.forEach(person => {
      if (person[2]==="✅"){
        strength += 1;
      }
    });
    return strength;
  }

  scanSuccessHandler($event) {
    const code = $event.replace("rsta-sedia.web.app/c/","")
    console.log(code);
    for (let i = 0; i < this.pltData.length; i++) {
      const personData = this.pltData[i];
      
      if (personData[0]===code){
        console.log(personData,this.moJi);
        if (personData[2] === this.moJi || personData[2] === this.loadingEmoji){
          break;
        } else if (this.bookIn===1) {
          personData[2] = this.loadingEmoji;
          this.admin.BiBo(true, personData[0],this.selectedPlt, null);
        } else if (this.bookIn===0){
          personData[2] = this.loadingEmoji;
          this.admin.BiBo(false, personData[0],this.selectedPlt,this.reason);
        }
        break;
      }

      
    }
  }


}
