import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-e-lanyard',
  templateUrl: './e-lanyard.component.html',
  styleUrls: ['./e-lanyard.component.css']
})
export class ELanyardComponent implements OnInit {

  constructor(private auth:AuthService ,private profile:ProfileService) { }

  code:string;
  url:string;
  data:any;
  time:string;
  intervalId:NodeJS.Timeout;

  ngOnInit(): void {
    this.auth.Init(true);
    this.profile.GetProfile(this.auth.uid).then(data=>{
      this.data = data;
      this.code = data._id;
      this.url = `http://rsta-sedia.web.app/c/${this.code}`;
    })


    this.intervalId = setInterval(()=>{
      let now = new Date();
      this.time = now.toString();
    },1000)
  }

  ngOnDestroy(){
    if (this.intervalId){
      clearInterval(this.intervalId);
    }
  }






}
