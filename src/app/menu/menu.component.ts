import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private admin:AdminService) { }
  isAdmin: boolean = false;
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
      this.isAdmin = isAdmin
    })
  }

}
