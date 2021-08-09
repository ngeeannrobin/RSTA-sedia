import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private fs: FirestoreService) { }


  IsAdmin(uuid:string):Promise<boolean> {
    return this.fs.IsAdmin(uuid);
  }

  GetCode():Promise<string>{
    return new Promise<string>((res,rej)=>{
      this.fs.GetCode().then(data=>{
        res(data.code)
      }).then(err=>{
        rej(err)
      })
    })
    
  }


  GetCodeObservable():Observable<any> {
    return this.fs.GetCodeObservable();
  }

  ChangeCode(freq){
    const length = 8;
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let newCode = "";
    for (let i=0; i<length; i++){
      newCode += char[Math.floor(Math.random() * char.length)]
    }
    this.fs.UpdateCode(newCode,freq)
  }


}
