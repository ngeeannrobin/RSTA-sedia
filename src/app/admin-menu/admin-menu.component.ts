import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private admin:AdminService) { }

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.CheckAdmin(this.auth.uid);
    })
  }

  async redirect(route:string){
    this.router.navigate([route]);
  }

  CheckAdmin(uid){
    this.admin.IsAdmin(uid).then(isAdmin=>{
      if (!isAdmin) {
        this.router.navigate([".."])
      }
    })
  }

}
