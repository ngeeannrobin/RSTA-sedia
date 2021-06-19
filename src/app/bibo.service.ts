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

  ViewBiboRecord(dt):Promise<any>{
    // return this.fs.GetBiboRecord("20210612");
    return this.fs.GetBiboRecord(dt.getFullYear().toString() +
    (dt.getMonth() + 1).toString().padStart(2,"0") +
    dt.getDate().toString().padStart(2,"0"));
  }
}
