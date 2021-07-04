import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';

@Component({
  selector: 'app-view-coy-bibo',
  templateUrl: './view-coy-bibo.component.html',
  styleUrls: ['./view-coy-bibo.component.css']
})
export class ViewCoyBiboComponent implements OnInit {

  constructor(private auth: AuthService, private bibo: BiboService) { }
  data:any = {};
  dateString: string;
  date:Date = new Date();
  title:string = "";
  changingDate = false;
  

  ngOnInit(): void {
    this.date = new Date()
    
    this.auth.Init(true).then(_=>{
      this.GetRecord(this.date);
    })
  }

  GetRecord(date:Date){
    this.bibo.ViewBiboRecord(date).then(res=>{
      this.data = res;
      this.title = `Bibo records on ${this.ConvertDateToTitle(date)}`;
      this.changingDate = false;
    })
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

  ChangeDate(){
    this.dateString = this.ConvertDateToInput(this.date);
    this.changingDate = true;
  }

  HandleDateChange($event){
    if (!$event.cancel){
      this.date = this.ConvertInputToDate($event.dateStr);
      this.GetRecord(this.date);
    }
  }

}
