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

  constructor(
    private auth:AuthService,
    private router:Router,
    private admin:AdminService,
    private prof:ProfileService
  ) { }
  isAdmin: boolean = false;
  changeRankName: boolean = false;
  name: string;

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      // this.prof.GetPID(this.auth.uid).then(pid=>{
      //   console.log(pid);
      //   if (pid == undefined){
      //     alert("Your data is not initialised, go to profile and copy that code at the bottom thx.");
      //     this.name = "Unknown"
      //   } else {
      //     this.name = this.CapitalizeTheFirstLetterOfEachWord(this.admin.GetName(pid).substring(3))
      //   }
      // })
      // this.CheckAdmin(this.auth.uid);
      if (this.auth.pid !== undefined){
        this.name = this.CapitalizeTheFirstLetterOfEachWord(this.admin.GetName(this.auth.pid));
      }
      
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

  CapitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

}
