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

  GetQR():Promise<string>{
    return new Promise<string>((res,rej)=>{
      this.fs.GetQR().then(data=>{
        res(data.qr)
      }).then(err=>{
        rej(err)
      })
    })
    
  }

  ChangeQR(){
    const length = 8;
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let result = "";
    for (let i=0; i<length; i++){
      result += char[Math.floor(Math.random() * char.length)]
    }

    return new Promise<string>((res,rej)=>{
      this.fs.UpdateQR(result).then(_=>{
        res(result);
      }).catch(err=>{console.log(err)})
    })


  }
}
