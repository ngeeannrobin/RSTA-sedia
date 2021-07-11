import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  
  constructor(private auth: AuthService, private admin: AdminService) { }
  code:string = "";
  url:string = "";
  updtFreq:number = 0;
  countDown:number = 0;
  freezeTimer:boolean = true;
  stopTimer:boolean = false;
  sub: Subscription;



  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.HandleObservable(this.admin.GetCodeObservable());
      this.CountDown();
    })
  }

  ngOnDestroy(): void {this.sub.unsubscribe(); this.stopTimer=true}

  HandleObservable(obs: Observable<any>){
    this.sub = obs.subscribe(change=>{
      // Update code locally
      this.HandleCode(change.code);

      // Update frequency
      this.updtFreq = change.updtFreq;

      // Update countdown
      let now = new Date();
      let update = change.nxtUpdt.toDate();
      this.countDown = Math.ceil((update.getTime() - now.getTime())/1000);
      this.freezeTimer = false;
    })
  }

  ChangeCode(){
    this.admin.ChangeCode(this.updtFreq);
  }

  HandleCode(code:string){
    this.code = code;
    this.url = `rsta-sedia.web.app/code/${code}`;
  }

  async CountDown(){
    while (!this.stopTimer){
      await this.Delay(1000);
      if (!this.freezeTimer){
        this.countDown -= 1;
        if (this.countDown<=0){
          this.freezeTimer = true;
          this.ChangeCode();
        }
      }
    }
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
