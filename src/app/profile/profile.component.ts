import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService, private prof:ProfileService, private router:Router) { }
  userData: any = {};
  changeRankName: boolean = false;
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
        this.GetProfile(this.auth.uid);
    })
  }


  GetProfile(uid){
    this.prof.GetProfile(uid).then(data=>{
      this.userData = data;
      this.userData.uid = uid;
      this.userData.url = this.auth.GetCurrentUser().photoURL || "../../assets/11.png";
    })
  }

  signOut() {
    this.auth.SignOut().then(_=>{
      this.router.navigate(['/login']);
    })
    
  }

  ConvertDate(date){
    const dt = new Date(date.seconds*1000);

    return (dt.getHours().toString().padStart(2,"0") +
    dt.getMinutes().toString().padStart(2,"0") +
    "hrs on " +
    dt.getDate().toString().padStart(2,"0") +
    (dt.getMonth() + 1).toString().padStart(2,"0") +
    dt.getFullYear().toString().substr(2,2));
  }

  HandleChange($event){
    this.changeRankName = $event;
  }

}
