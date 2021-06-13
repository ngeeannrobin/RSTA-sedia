import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private fs: FirestoreService) { }


  IsAdmin(uuid:string):Promise<boolean> {
    return this.fs.IsAdmin(uuid);
  }
}
