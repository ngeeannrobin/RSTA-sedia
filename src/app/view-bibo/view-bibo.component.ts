import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';

@Component({
  selector: 'app-view-bibo',
  templateUrl: './view-bibo.component.html',
  styleUrls: ['./view-bibo.component.css']
})
export class ViewBiboComponent implements OnInit {

  constructor(private auth: AuthService, private bibo: BiboService) { }
  data:any = {};
  dateString: string;
  date:Date = new Date();
  changingDate = false;
  @ViewChild('dateinput', {static: false}) dateInput: ElementRef;

  ngOnInit(): void {
    this.date = new Date();
    this.dateString = this.ConvertDateToInput(this.date);
    this.auth.Init(true).then(_=>{
      this.GetRecord();
    })
  }

  onFocusOutEvent(event: any){

    console.log(event.target.value);
 
 }

  GetRecord(){
    this.changingDate=  false;
    this.date = this.ConvertInputToDate(this.dateString);
    this.bibo.ViewBiboRecord(this.date).then(res=>{
      this.data = res;
    })
  }

  ToggleDate(){
    console.log(this.changingDate)
    if (this.changingDate){
      this.GetRecord();
    } else {
      this.changingDate = true;
    }

    
    
  }

  ConvertInputToDate(str: string){
    return new Date(str);
  }

  ConvertDateToInput(ts: Date){
    return `${ts.getFullYear().toString()}-${(ts.getMonth() + 1).toString().padStart(2,"0")}-${ts.getDate().toString().padStart(2,"0")}`;
  }

  ConvertDateToTitle(ts: Date){
    return `${ts.getDate().toString().padStart(2,"0")}${(ts.getMonth() + 1).toString().padStart(2,"0")}${ts.getFullYear().toString().substr(2,2)}`;
  }

  ConvertDateToHours(ts){
    const dt = new Date(ts.seconds*1000);
    return `${dt.getHours().toString().padStart(2,"0")}${dt.getMinutes().toString().padStart(2,"0")} hrs`
  }

  NoRecord(){
    return Object.keys(this.data).length===0
  }

}
