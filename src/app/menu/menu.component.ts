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
  name: string;
  ranks = [
    "REC","PTE","PFC","LCP","CPL","CFC",
    "3SG","2SG","1SG","SSG","MSG", 
    // "3WO","2WO","1WO","MWO","SWO","CWO",
    "2LT","LTA","CPT"
  ]

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.prof.GetProfile(this.auth.uid).then(data=>{
        if (data == undefined){
          this.changeRankName = true;
        } else {
          this.name = this.CraftName(data.rank,data.name);
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


  CraftName(rank, name){
    let rankname = "";
    switch(rank){
      // ==========
      case "3SG":
      case "2SG":
      case "1SG":
        rankname = "Sergeant ";
        break;
      // ==========
      case "SSG":
        rankname = "Staff ";
        break;
      // ==========
      case "MSG":
        rankname = "Master ";
        break;
      // ==========
      case "2LT":
        rankname = "Sir ";
        break;
      // ==========
      case "LTA":
        rankname = "Lieutenant "
        break;
      // ==========
      case "CPT":
        rankname = "Captain "
        break;
      // ==========
      default:
        break;
    }
    rankname += this.CapitalizeTheFirstLetterOfEachWord(name);
    return rankname;
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
