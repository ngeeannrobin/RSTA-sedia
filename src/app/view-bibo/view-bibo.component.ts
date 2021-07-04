import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';

@Component({
  selector: 'view-bibo',
  templateUrl: './view-bibo.component.html',
  styleUrls: ['./view-bibo.component.css']
})
export class ViewBiboComponent implements OnInit {

  constructor() { }

  @Input() data:any = {};
  @Input() title:string = "";

  ngOnInit(): void {

  }

  ConvertDateToHours(ts){
    const dt = new Date(ts.seconds*1000);
    return `${dt.getHours().toString().padStart(2,"0")}${dt.getMinutes().toString().padStart(2,"0")} hrs`
  }

  NoRecord(){
    return Object.keys(this.data).length===0
  }

}
