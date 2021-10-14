import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-bibo',
  templateUrl: './admin-bibo.component.html',
  styleUrls: ['./admin-bibo.component.css']
})
export class AdminBiboComponent implements OnInit {

  constructor(private admin:AdminService) { }
  
  selectedPlt: Number;

  ngOnInit(): void {
    
  }

  SelectedPlatoon($event){
    this.SelectedPlatoon=$event;
  }


}
