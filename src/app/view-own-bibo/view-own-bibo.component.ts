import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';

@Component({
  selector: 'app-view-own-bibo',
  templateUrl: './view-own-bibo.component.html',
  styleUrls: ['./view-own-bibo.component.css']
})
export class ViewOwnBiboComponent implements OnInit {

  constructor(private auth: AuthService, private bibo: BiboService) { }
  data: any = {};
  title: string = "My BIBO Records";
  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      this.GetRecord(this.auth.uid);
    })
  }

  GetRecord(uid:string){
    this.bibo.OwnBiboRecord(uid).then(res=>{
      this.data = res;
    })
  }

}
