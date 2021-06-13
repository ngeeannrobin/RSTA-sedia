import { Component, OnInit } from '@angular/core';
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
  today:Date = new Date();
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.bibo.ViewBiboRecord(this.today).then(res=>{
        this.data = res;
        console.log(this.data);
      })
      
    })
  }

  ConvertDate(ts){
    return ts.getDate().toString().padStart(2,"0") +
    (ts.getMonth() + 1).toString().padStart(2,"0") +
    ts.getFullYear().toString().substr(2,2);
  }

  ConvertHrs(ts){
    const dt = new Date(ts.seconds*1000);
    return dt.getHours().toString().padStart(2,"0") +
    dt.getMinutes().toString().padStart(2,"0")
  }

  NoRecord(){
    return Object.keys(this.data).length===0
  }

}
