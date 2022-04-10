import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public uid;
  public pid;
  constructor(private auth: AngularFireAuth, private router: Router, private fs:FirestoreService) { }


  Init(redirect=false): Promise<void> {
    const loginPromise = this.CheckLogin();
    const uidPromise = this.GetUserId();

    return new Promise((res,rej):void=>{
      Promise.all([loginPromise,uidPromise]).then(values=>{
        if (!values[0] && redirect){
          this.router.navigate(["/login"]);
        } else {
          this.uid = values[1];
          this.fs.GetUser(this.uid).then(data=>{
            this.pid = data.pid;
            res();
          });
        }
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

  EmailSignIn(email,password) {
    return firebase.auth().signInWithCredential(firebase.auth.EmailAuthProvider.credential(email,password));
  }

  EmailSignUp(email,password) {
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  EmailResetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }


  SignOut(): Promise<void> {
    return this.auth.signOut()
  }
}
