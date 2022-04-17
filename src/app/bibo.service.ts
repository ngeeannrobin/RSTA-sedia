import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { functions } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BiboService {

  constructor(public fs: FirestoreService) { }

  Book(bookIn,qr):Promise<any> {
    const url = "https://us-central1-rsta-bibo.cloudfunctions.net/BookIn";
    let HttpBookIn = functions().httpsCallable('BookIn');
    return new Promise((res)=>{
      HttpBookIn({code: qr, bin: bookIn}).then(data=>{
        res(data.data);
      })
    })
  }

  BookV2(bookIn,date,pid,reason,remark):Promise<any> {
    const recordPromise = this.fs.AddBiboRecordV2(pid,date,bookIn,reason,remark);
    const psPromise = this.fs.UpdatePSBIBO(pid,bookIn,reason,remark);
    return Promise.all([recordPromise,psPromise]);
  }

  GetLatestBIBO(pid):Promise<any> {
    return new Promise<any>((res,rej)=>{
      this.fs.GetLatestBIBO(pid,1).then(values=>{
        res(values[0]);
      }).catch(err=>{
        rej(err);
      })
    });
  }

  ViewBiboRecord(dt:Date):Promise<any>{
    // return this.fs.GetBiboRecord("20210612");
    // return this.fs.GetBiboRecord(dt.getFullYear().toString() +
    // (dt.getMonth() + 1).toString().padStart(2,"0") +
    // dt.getDate().toString().padStart(2,"0"));
    let start = new Date(dt);
    let end = new Date(dt);
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    return this.fs.GetBiboRecord(start,end);
  }

  OwnBiboRecord(uid:string):Promise<any>{
    return this.fs.GetBiboByUid(uid);
  }
}
