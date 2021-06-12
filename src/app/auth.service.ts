import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  CheckLogin(): Promise<boolean> {
    let promise: Promise<boolean> = new Promise<boolean>((res)=>{
      this.auth.currentUser.then(user=>{
        res(user!=null);
      })
    })
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
