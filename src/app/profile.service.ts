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

  UpdateProfile(uuid,plt,name){
    return this.fs.UpdateUser(uuid,`${plt}99`,name);
  }
}
