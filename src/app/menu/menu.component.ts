import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private admin:AdminService,private prof:ProfileService) { }
  isAdmin: boolean = false;
  changeRankName: boolean = false;
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.prof.GetProfile(this.auth.uid).then(data=>{
        if (data == undefined){
          this.changeRankName = true;
        }
      })

      this.CheckAdmin(this.auth.uid);
    })
  }

  async redirect(route:string){
    this.router.navigate([route]);
  }

  CheckAdmin(uid){
    this.admin.IsAdmin(uid).then(isAdmin=>{
      this.isAdmin = isAdmin
    })
  }

  HandleChange($event){
    this.changeRankName = $event;
  }

}
