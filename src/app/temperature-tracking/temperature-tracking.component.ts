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

  displayData: any[] = [];
  selectNew: boolean = false;

  ngOnInit(): void {
    // change to true
    this.auth.Init(true).then(_=>{
      this.admin.GetTempData().then(data=>{
        this.displayData = data;
      })
    })
  }

  Selected($event){
    this.selectNew = false;
    // check duplicate
    let duplicate = false;
    this.displayData.forEach(person => {
      if (person.id==$event){
        duplicate = true;
        return;
      }
    });
    if (!duplicate){
      let obj = {
        r: 'tbc',
        s: 'tbc',
        id: $event,
        name: this.admin.GetName($event)
      }
      this.Update(obj).then(_=>{
        this.displayData.push(obj);
      })
    }

  }

  Cancel(){
    this.selectNew = false;
  }


  Edit(doc) {
    doc.edit=true;
    doc.text=`${doc.t||''}\n${doc.r}\n${doc.s}`
  }

  CancelEdit(doc){
    delete doc.text;
    delete doc.edit;
  }

  Save(doc){
    let rows:string[] = doc.text.split('\n');
    if (rows.length>=3){
      doc.t = parseFloat(rows.shift());
      if (Number.isNaN(doc.t)) {delete doc.t};
      doc.r = rows.shift();
      doc.s = rows.join('\n');

      this.Update(doc).then(_=>{
        delete doc.text;
        delete doc.edit;
      })

    } else {
      alert("Invalid format.");
    }
  }

  ResetTemp(){
    this.admin.ResetTemp(this.displayData).then(_=>{
      this.displayData.forEach(doc=>{
        delete doc.t;
      })
    })
  }

  Update(doc){
    return this.admin.UpdateTemp(doc);
  }

  ConvertDateToTitle(dt: Date){
    return `${dt.getDate().toString().padStart(2,"0")}${(dt.getMonth() + 1).toString().padStart(2,"0")}${dt.getFullYear().toString().substr(2,2)}`;
  }

  ClosestReportingTime(dt: Date){
    let reportTime = [800,1500,2100];
    let currentTime = dt.getHours() * 100 + dt.getMinutes();
    let closestTime = reportTime[0];
    reportTime.forEach(time=>{
      if (Math.abs(time-currentTime)<Math.abs(closestTime-currentTime)){
        closestTime = time;
      }
    })
    return closestTime;
  }

  

  CopyReport(){

    let dt = new Date();
    let text = `*RSTA Company Temperature Taking on ${this.ConvertDateToTitle(dt)} at ${this.ClosestReportingTime(dt)}*`;
    
    for (let i = 0; i < this.displayData.length; i++) {
      const doc = this.displayData[i];
      text+=`\n\n${i+1}) ${this.admin.ConvertName(doc.name)}\n${doc.t||''}\n${doc.r}\n${doc.s}`;
    }

    navigator.clipboard.writeText(text).then(_=>{
      alert("Text copied.");
    })
  }

  Delete(doc){
    this.admin.DeleteTemp(doc).then(_=>{
      this.displayData.splice(this.displayData.indexOf(doc),1);
    })
  }

}
