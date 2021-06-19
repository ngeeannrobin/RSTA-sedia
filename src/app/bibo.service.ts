import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { functions } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BiboService {

  constructor(public fs: FirestoreService) { }

  Book(bookIn,qr) {
    const url = "https://us-central1-rsta-bibo.cloudfunctions.net/BookIn";
    // return this.fs.SetBiboRequest(uuid,bookIn,qr);
    // return this.http.get(url,{withCredentials: true,params:{code: qr}})
    let f = functions().httpsCallable('BookIn');
    return f({code: qr, bin: bookIn});
  }

  ViewBiboRecord(dt):Promise<any>{
    // return this.fs.GetBiboRecord("20210612");
    return this.fs.GetBiboRecord(dt.getFullYear().toString() +
    (dt.getMonth() + 1).toString().padStart(2,"0") +
    dt.getDate().toString().padStart(2,"0"));
  }
}
