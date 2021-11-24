import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fs: FirestoreService) { }

  GetProfile(uuid) {
    let prom = new Promise<any>(res=>{
      this.fs.GetUser(uuid).then(snapshot=>{
        if (snapshot.empty) 
          res({});

        
        let data;
        snapshot.forEach(ss => {
          data = ss.data();
          data["_id"] = ss.id;
          return;
        });
        res(data);
      });
    });
    return prom;
  }

//   return new Promise((res,rej)=>{
//     ref.get().then(snapshot=>{
//       if (snapshot.empty) {
//         res({}); 
//       }
//       let array = [];
//       snapshot.forEach(doc => {
//         array.unshift(doc.data());
//       });
//       res(array);
//     })
//   })
// }


  UpdateProfile(uuid,name){
    return this.fs.UpdateUser(uuid,name);
  }
}
