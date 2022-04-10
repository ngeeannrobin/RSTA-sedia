import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor(private http: HttpClient) { }

  GetLocalDate(): Promise<Date> {
    return new Promise<Date>(res=>{
      res(new Date());
    })
  }

  GetTrueDate(): Promise<Date> {
    const url = "http://worldtimeapi.org/api/timezone/Asia/Singapore";
    return new Promise<Date>(res=>{
      this.http.get(url).subscribe(data=>{
        let date:Date = new Date(data["datetime"]);
        res(date);
      })
    })
  }

  ConvertTimestampToDate(ts):Date {
    let dt: Date = ts.toDate();
    return dt;
  }

  ConvertDateToDDMMYY_HHMM_DDD(dt: Date) {
    let ds:string = "";
    ds += dt.getDate().toString().padStart(2,"0");        // DD
    ds += (dt.getMonth() + 1).toString().padStart(2,"0"); // DDMM
    ds += dt.getFullYear().toString().substr(2,2);        // DDMMYY
    ds += " "
    ds += dt.getHours().toString().padStart(2,"0");       // DDMMYY HH
    ds += dt.getMinutes().toString().padStart(2,"0")      // DDMMYY HHMM
    ds += "hrs ("
    ds += ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dt.getDay()] // DDMMYY HHMMhrs (DDD
    ds += ")"
    return ds;
  }

  ConvertTimestampToDDMMYY_HHMM_DDD(ts) {
    let dt: Date = this.ConvertTimestampToDate(ts);
    return this.ConvertDateToDDMMYY_HHMM_DDD(dt);
  }
}
