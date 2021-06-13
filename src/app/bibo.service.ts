import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class BiboService {

  constructor(public fs: FirestoreService) { }

  Book(uuid,bookIn,qr) {
    return this.fs.SetBiboRequest(uuid,bookIn,qr);
  }

  ViewBiboRecord(dt):Promise<any>{
    // return this.fs.GetBiboRecord("20210612");
    return this.fs.GetBiboRecord(dt.getFullYear().toString() +
    (dt.getMonth() + 1).toString().padStart(2,"0") +
    dt.getDate().toString().padStart(2,"0"));
  }
}
