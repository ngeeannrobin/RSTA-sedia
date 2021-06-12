import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  GetRequest(doc): Promise<any>{
    return new Promise((res,rej) => {
      let disposeable = doc.valueChanges().subscribe(
        data => { 
          res(data);
          disposeable.unsubscribe();
        },
        err => {
          rej(err);
        }
      )
    })
  }

  // primary used for querys
  GetRequestByRef(ref): Promise<any>{
    return new Promise((res,rej)=>{
      ref.get().then(snapshot=>{
        if (snapshot.empty) {
          res({}); 
        }
        let array = [];
        snapshot.forEach(doc => {
          array.unshift(doc.data());
        });
        res(array);
      })
    })
  }

  SetBiboRequest(uuid,bookIn,qr){
    const doc = this.db.doc(`req/${uuid}`);
    const obj = {
      in: bookIn,
      qr: qr
    }
    console.log(doc.ref)
    return doc.set(obj);
  }

  GetUser(uuid) {
    return this.GetRequest(this.db.doc(`user/${uuid}`));
  }

  UpdateUser(uuid,rank,name){
    const doc = this.db.doc(`user/${uuid}`);
    const obj = {
      rank: rank,
      name: name.toUpperCase()
    }
    return doc.set(obj,{merge:true});
  }



}
