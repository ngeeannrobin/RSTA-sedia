import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fs: FirestoreService) { }

  GetProfile(uuid) {
    return this.fs.GetUser(uuid);
  }

  UpdateProfile(uuid,name){
    return this.fs.UpdateUser(uuid,name);
  }
}
