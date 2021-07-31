import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  GetRequestObservable(doc): Observable<any> {
    return doc.valueChanges();
  }

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

  UpdateUser(uuid,name){
    const doc = this.db.doc(`user/${uuid}`);
    const obj = {
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

  GetBiboRecord(start:Date, end:Date):Promise<any>{
    const ref = this.db.collection(`rec`).ref
      .where('time','>=',start)
      .where('time','<=',end)
      .orderBy("time","desc");
    return this.GetRequestByRef(ref);
  }

  GetBiboByUid(uid:string):Promise<any>{
    const ref = this.db.collection(`rec`).ref
      .where('uid','==',uid)
      .orderBy("time","desc");
    return this.GetRequestByRef(ref);
  }

  GetCode(){
    return this.GetRequest(this.db.doc("data/_"));
  }

  GetCodeObservable(){
    return this.GetRequestObservable(this.db.doc("data/_"));
  }

  UpdateCode(txt: string, freq: number){
    const doc = this.db.doc("data/_");
    let date = new Date();
    date.setSeconds(date.getSeconds() + freq);

    const obj = {code: txt, nxtUpdt: date};
    return doc.set(obj, {merge: true});
  }

  GetGpsData() {
    return this.GetRequest(this.db.doc(`data/geo`));
  }


}
