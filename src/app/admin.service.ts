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

  GetParadeState() {
    const headingProm = this.fs.GetParadeStateHeading();
    const peopleProm = this.fs.GetPeople();

    return new Promise<any>(res=>{
      Promise.all([headingProm,peopleProm]).then(value=>{
        // INIT PARADE STATE
        let paradeState:any = {
          heading: {},
          people: {}
        };
        const plts = ['0','1','2','3','4']
        plts.forEach(p=>{
          paradeState.people[p] = [];
        })

        // INJECT HEADING
        paradeState.heading = value[0]
  
        // INJECT EACH PERSON INTO RESPECTIVE PLT
        value[1].forEach(person => {
          paradeState.people[person.cat[0]].unshift(person)
        });

        // SORT
        plts.forEach(p=>{
          paradeState.people[p].sort((a,b)=>{
            if (a.cat > b.cat) return -1;
            if (a.cat < b.cat) return 1;
            if (a.name > b.name) return -1;
            if (a.name < a.name) return 1;
          });
        })
        res(paradeState);
      })
    });


  }
}
