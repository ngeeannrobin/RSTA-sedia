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
}
