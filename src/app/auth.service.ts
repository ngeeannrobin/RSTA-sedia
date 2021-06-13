import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public uid;
  constructor(private auth: AngularFireAuth, private router: Router) { }


  Init(redirect=false): Promise<void> {
    const loginPromise = this.CheckLogin();
    const uidPromise = this.GetUserId();

    return new Promise((res,rej):void=>{
      Promise.all([loginPromise,uidPromise]).then(values=>{
        if (!values[0] && redirect){
          this.router.navigate(["/login"]);
        }
        this.uid = values[1];
        res();
      })
    });
  }
  
  CheckLogin(): Promise<boolean> {
    return new Promise<boolean>((res)=>{
      this.auth.currentUser.then(user=>{
        res(user!=null);
      })
    });
  }

  GetUserId(): Promise<string> {
    return new Promise<string>((res)=>{
      this.auth.currentUser.then(user=>{
        res(user?.uid);
      })
    });
  }

  GetCurrentUser() {
    return firebase.auth().currentUser;
  }

  AuthLogin(provider){
    return this.auth.signInWithPopup(provider);
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  


  SignOut(): Promise<void> {
    return this.auth.signOut()
  }
}
