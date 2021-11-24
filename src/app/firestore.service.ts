import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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

    // primary used for querys
    GetRequestByRefWithId(ref): Promise<any>{
      return new Promise((res,rej)=>{
        ref.get().then(snapshot=>{
          if (snapshot.empty) {
            res({}); 
          }
          else {
            let data = {};
            snapshot.forEach(doc=>{
              data[doc.id] = doc.data();
            })
            res(data);
          }
        })
      })
    }

  GetUser(uuid) {
    const ref = this.db.collection(`person`).ref
    .where('uid','==',uuid);
    return ref.get();
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

  // PARADE STATE
  GetParadeState() {
    return this.GetRequest(this.db.doc(`data/parade-state`));
  }

  UpdateParadeStateHeading(appt,name) {
    const doc = this.db.doc("data/PSH");
    const obj = {};
    obj[appt] = name;
    return doc.set(obj, {merge: true});
  }

  // TEMPERATURE TRACKING
  GetTempData() {
    return this.GetRequestByRefWithId(this.db.collection(`temp-tracking`).ref)
  }

  UpdateTemp(id,doc) {
    return this.db.doc(`temp-tracking/${id}`).set(doc);
  }

  ResetTemp(id) {
    return this.db.doc(`temp-tracking/${id}`).update({t: firebase.firestore.FieldValue.delete()})
  }

  DeleteTemp(id) {
    return this.db.doc(`temp-tracking/${id}`).delete();
  }
  
  // BIBO

  GetPlatoonNic(plt){
    return this.GetRequestObservable(this.db.doc(`data/PS${plt}_nic`));
  }

  AddBiboRecord(bin: boolean, name: string, date: Date){
    const col = this.db.collection("rec");
    return col.add({in: bin, name: name, time: date});
  }

  UpdateParadeState(path,pid,data){
    const doc = this.db.doc(`data/${path}`);
    let obj = {};
    obj[pid] = data||firebase.firestore.FieldValue.delete();
    return doc.update(obj);
  }

  UpdateLastBIBO(pid, bin, date, reason){
    const doc = this.db.doc(`person/${pid}`);
    let obj = {};
    if (!bin){
      obj['reason'] = reason;
      obj['lastBookOut'] = date;
    } else {
      obj['lastBookIn'] = date;
    }
    return doc.update(obj);
  }

}
