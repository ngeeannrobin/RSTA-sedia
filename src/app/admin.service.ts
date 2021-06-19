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

  GetCode():Promise<string>{
    return new Promise<string>((res,rej)=>{
      this.fs.GetCode().then(data=>{
        res(data.code)
      }).then(err=>{
        rej(err)
      })
    })
    
  }

  ChangeCode(){
    const length = 8;
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let newCode = "";
    for (let i=0; i<length; i++){
      newCode += char[Math.floor(Math.random() * char.length)]
    }

    return new Promise<string>((res,rej)=>{
      this.fs.UpdateCode(newCode).then(_=>{
        res(newCode);
      }).catch(err=>{console.log(err)})
    })


  }
}
