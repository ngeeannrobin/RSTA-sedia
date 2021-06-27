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

  IsAdmin(uuid):Promise<boolean>{
   const prom = this.GetRequest(this.db.doc(`user-private/${uuid}`));
   return new Promise((res,rej)=>{
     prom.then(data=>{
      res(data?.admin);
     }).catch(err=>{rej(err)})
   })
  }

  GetBiboRecord(dateId:string):Promise<any>{
    const ref = this.db.collection(`rec/${dateId}/rec`).ref.orderBy("time","desc");
    return this.GetRequestByRef(ref);
  }

  GetCode(){
    return this.GetRequest(this.db.doc("data/_"));
  }

  UpdateCode(txt: string){
    const doc = this.db.doc("data/_");
    const obj = {code: txt};
    return doc.set(obj);
  }

  GetGpsData() {
    return this.GetRequest(this.db.doc(`data/geo`));
  }


}
