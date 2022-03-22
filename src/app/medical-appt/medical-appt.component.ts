import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-medical-appt',
  templateUrl: './medical-appt.component.html',
  styleUrls: ['./medical-appt.component.css']
})
export class MedicalApptComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private admin: AdminService,
  ) { }

  displayData: any[] = [];
  selectNew: boolean = false;
  code: string = "";
  generatedText: string = "";
  newMA = null;
  encodeURIComponent = encodeURIComponent;

  ngOnInit(): void {
    // change to true
    this.auth.Init(false).then(_=>{
      this.admin.GetMAData().then(data=>{
        this.displayData = data;
        this.SortData();
      })
    })
  }

  SortData(){
    this.displayData.sort((a,b)=> (a.name > b.name)?1:-1)
    this.displayData.forEach(doc=>{
      doc.ma.sort((a,b)=>(a.dt>b.dt)?1:-1)
    })
    console.log(this.displayData);
  }

  AddToLocalData(id,ma,newPerson){
    ma.dt = firestore.Timestamp.fromDate(ma.dt);
    if (newPerson){
      this.displayData.push({id: id, name: this.admin.GetName(id), ma: [ma]});
    } 
    else {
      this.displayData.forEach(person => {
        if (person.id === id) {
          person.ma.push(ma);
        }
      });
    }
  }

  Selected(id:string){
    this.newMA = {
      id: id,
      r: "",
      l: "",
      dt: ""
    }
  }
  
  NewMA(){
    let newMA = this.newMA;
    this.newMA = null;

    // Check if new MA personnel has an existing MA
    let newPerson = true;
    this.displayData.forEach(person=>{
      console.log(person.id,newMA.id);
      if (person.id === newMA.id){
        newPerson = false;
        return;
      }
    })
    
    // Data formating
    newMA.dt = new Date(newMA.dt);
    let id = newMA.id;
    delete newMA.id;

    if (newPerson){
      console.log("new")
      this.admin.AddMA(id, newMA).then(_=>{
        this.AddToLocalData(id, newMA,newPerson);
      })
    } else {
      this.admin.AppendMA(id, newMA).then(_=>{
        this.AddToLocalData(id, newMA,newPerson);
      });
    }
  }

  GenerateReport(){
    let text = "*Upcoming Medical Appointments*";
    this.displayData.forEach(doc => {
      text += `\n\n*${this.admin.ConvertName(doc.name)}*`;
      doc.ma.forEach(apt => {
        text += `\n- ${apt.r} at ${apt.l} on ${this.ConvertTimestampToString(apt.dt)}`
      });
    });
    this.generatedText = this.admin.Decode(text,this.code);
    this.code="";
  }

  Copy() {
    navigator.clipboard.writeText(this.generatedText).then(_=>{
      alert("Text copied.");
    })
  }

  ConvertTimestampToString(ts) {
    let dt: Date = ts.toDate();
    let date:string = "";
    date += dt.getDate().toString().padStart(2,"0");        // DD
    date += (dt.getMonth() + 1).toString().padStart(2,"0"); // DDMM
    date += dt.getFullYear().toString().substr(2,2);        // DDMMYY
    date += " "
    date += dt.getHours().toString().padStart(2,"0");       // DDMMYY HH
    date += dt.getMinutes().toString().padStart(2,"0")      // DDMMYY HHMM
    date += "hrs ("
    date += ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dt.getDay()] // DDMMYY HHMMhrs (DDD
    date += ")"
    return date;
  }
}
