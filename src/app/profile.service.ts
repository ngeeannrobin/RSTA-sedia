import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fs: FirestoreService) { }

  GetProfile(uuid) {
    let prom = new Promise<any>(res=>{
      this.fs.GetUser(uuid).then(data=>{
        res(data[0]);
      });
    });
    return prom;
  }

  UpdateProfile(uuid,name){
    return this.fs.UpdateUser(uuid,name);
  }
}
