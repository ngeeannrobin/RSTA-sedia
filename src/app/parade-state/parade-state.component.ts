import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { ParadeStateService } from '../parade-state.service';

@Component({
  selector: 'app-parade-state',
  templateUrl: './parade-state.component.html',
  styleUrls: ['./parade-state.component.css']
})
export class ParadeStateComponent implements OnInit {

  constructor(private auth: AuthService, private admin: AdminService) { }
  paradeState: any;
  init: boolean = false;
  groups: any[] = [
    ["hq", "COY HQ"],
    ["plt1", "PLATOON 1"],
    ["plt2", "PLATOON 2"],
    ["plt3", "PLATOON 3"],
    ["plt4", "PLATOON 4"]
  ];
  nicid: string[];
  nom: any;
  open:boolean = false;
  catFilter: string[];

  // path to thing to change lol
  toChange:string;

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.admin.GetParadeState().then(data=>{
        this.paradeState = data;
        this.nicid = Object.keys(this.paradeState.nic);
        this.nom = this.admin.GetNom();        
        this.init = true;
        console.log(this.paradeState)
      })
    })
  }

  Edit(catFilter: string[], toChange: string){
    this.catFilter = catFilter;
    this.toChange = toChange;
    this.open = true;
  }

  Selected($event) {
    console.log($event);
    this.open = false;
    this.paradeState[this.toChange] = $event;
  }
}
