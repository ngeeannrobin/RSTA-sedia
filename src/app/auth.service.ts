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
  
  CheckLogin(redirect=false): Promise<boolean> {
    let promise: Promise<boolean> = new Promise<boolean>((res)=>{
      this.auth.currentUser.then(user=>{
        res(user!=null);
      })
    });
    if (redirect){
      promise.then(loggedIn=>{
        if (!loggedIn) {
          this.router.navigate(["/login"]);
        } else {
          this.GetUserId().then(uid=>{
            this.uid = uid;
          })
        }
      })
    }
    return promise;
  }

  GetUserId(): Promise<string> {

    let promise: Promise<string> = new Promise<string>((res)=>{
      this.auth.currentUser.then(user=>{
        res(user?.uid);
      })
    })
    return promise;
  }

  AuthLogin(provider){
    return this.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('log in success')
    }).catch((error) => {
        console.log(error)
    })
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  


  SignOut(): Promise<void> {
    return this.auth.signOut()
  }
}
