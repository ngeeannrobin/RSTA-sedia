import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parade-state',
  templateUrl: './parade-state.component.html',
  styleUrls: ['./parade-state.component.css']
})
export class ParadeStateComponent implements OnInit {

  constructor(private auth: AuthService, private admin: AdminService, private router: Router) { }
  paradeState: any;
  init: boolean = false;
  nicid: string[] = [];
  stsid: string[];
  nom: any;
  open:boolean = false;
  catFilter: string[];
  show:any = {
    reason: true,
    status: false
  };
  code:string = "";
  psCode = this.admin.paradeStateCode;
  psCodeOrder = ["TT","PS","SO","OF","LV","MC","AT","CS","XX","GD","BO"];

  ngOnInit(): void {
    this.auth.Init(true).then(_=>{
      // this.admin.GetParadeState().subscribe(ps=>{
      //   console.log(ps);
      //   this.paradeState = ps;
      //   this.nom = this.admin.GetNom();
      //   this.init = true;
      this.admin.GetParadeStateV2().then(ps=>{
        this.paradeState = ps;
        this.nom = this.admin.GetNom();
        this.init = true;
      })
    })
  }

  Cancel() {
    this.open = false;
  }

  ConvertTimestampToDate(ts){
    const dt = new Date(ts.seconds*1000);
    return `${dt.getDate().toString().padStart(2,"0")}${(dt.getMonth() + 1).toString().padStart(2,"0")}${dt.getFullYear().toString().substr(2,2)}`
  }

  GenerateAndSend(){
    // HEADING
    let dt = new Date();
    let text = `*ISR*\n`;
    text += `DATE: ${dt.getDate()} ${["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][dt.getMonth()]} ${dt.getFullYear()}\n`;
    text += `\nCDO:\nCDS\n\n--------------------------------\n\n`;

    // STRENGTH
    this.psCodeOrder.forEach(code=>{
      text+= `${this.psCode[code].e} ${this.psCode[code].l}: ${this.paradeState.strength[code].toString().padStart(2,'0')}\n`;
    })
    text += `\n--------------------------------\n\n`

    // PLATOON LEVEL STRENGTH
    this.paradeState.plt.forEach(plt => {
      text += `*${plt.label} [${plt.strength.PS}/${plt.strength.TT}]*\n`;
      plt.ppl.forEach(pid=>{
        text += `${this.admin.ConvertName(this.nom[pid])} ${plt.bookedOut[pid]?.e||'✅'}${[undefined,null,""].includes(plt.bookedOut[pid]?.rm)?"":`(${plt.bookedOut[pid]?.rm})`}\n`;
      })
      text += "\n";
    });

    // STATUS
    text+=`--------------------------------\n\nSTATUSES`

    // DECODE
    text = this.admin.Decode(text,this.code);
    
    // HIDE CODE
    this.code = "";

    // SEND
    window.location.assign(`https://wa.me?text=${encodeURIComponent(text)}`);
  }
}
