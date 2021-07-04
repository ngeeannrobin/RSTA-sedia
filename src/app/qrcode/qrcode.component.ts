import { Component, OnInit } from '@angular/core';
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
  changeFrequency:number = 180;
  countDown:number = this.changeFrequency;
  changing:boolean = false;
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.admin.GetCode().then(code=>{
        this.HandleCode(code);
        this.CountDown();
      })
    })
  }

  ChangeCode(){
    this.admin.ChangeCode().then(txt=>{
      this.HandleCode(txt);
      this.countDown = this.changeFrequency;
      this.changing = false;
    })
  }

  HandleCode(code:string){
    this.code = code;
    this.url = `rsta-sedia.web.app/code/${code}`;
  }

  async CountDown(){
    while (true){
      await this.Delay(1000);
      if (this.countDown>0){
        this.countDown -= 1;
      } else if (!this.changing) {
        this.ChangeCode();
        this.changing = true;
      }
    }
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
