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
      this.prof.GetProfile(this.auth.uid).then(data=>{
        if (data == undefined){
          this.changeRankName = true;
        } else {
          this.name = this.CapitalizeTheFirstLetterOfEachWord(data.name)
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

  CapitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

}
