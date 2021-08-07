import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parade-state',
  templateUrl: './parade-state.component.html',
  styleUrls: ['./parade-state.component.css']
})
export class ParadeStateComponent implements OnInit {

  constructor(private auth: AuthService, private admin: AdminService) { }
  paradeState: any;
  init: boolean = false;
  title: any = ["COY HQ","PLATOON 1","PLATOON 2","PLATOON 3","PLATOON 4"];
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.admin.GetParadeState().then(data=>{
        this.paradeState = data;
        this.init = true;
      })
    })
  }

}
