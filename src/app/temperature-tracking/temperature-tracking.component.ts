import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-temperature-tracking',
  templateUrl: './temperature-tracking.component.html',
  styleUrls: ['./temperature-tracking.component.css']
})
export class TemperatureTrackingComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private admin: AdminService,
  ) { }

  ngOnInit(): void {

    // change to true
    this.auth.Init(false).then(_=>{

    })
  }

}
