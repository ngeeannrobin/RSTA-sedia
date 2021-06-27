import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = "";
  promptEmail: boolean = false;
  signUp: boolean = false;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.Checker();
  }

  async signInWithGoogle(){
    this.auth.CheckLogin().then(loggedIn=>{
      if (!loggedIn){
        this.message = "Google Pop-up opened."
        this.auth.GoogleAuth().catch(err=>{
          this.message = err.message;
        })
      } else {
        this.redirect();
      }
    }) 
  }

  signUpWithEmail(){
    this.signUp = true;
    this.promptEmail = true;
  }

  signInWithEmail(){
    this.signUp = false;
    this.promptEmail = true;
  }

  EmailPassword($event){
    this.promptEmail = false;
    if ($event.checked){
      if(this.signUp){
        this.EmailSignUp($event.email,$event.password);
      } else {
        this.EmailSignIn($event.email,$event.password);
      }
      this.message = "Loading..."
    }
  }

  EmailSignUp(email, password){
    this.auth.EmailSignUp(email, password).catch(err=>{
      this.message = err.message;
    })
  }

  EmailSignIn(email, password){
    this.auth.EmailSignIn(email, password).catch(err=>{
      this.message = err.message;
    })
  }




  async Checker(){
    let checking = true;
    while (checking){
      this.auth.CheckLogin().then(loggedIn=>{
        if (loggedIn){
          checking=false;
          this.redirect();
        }
      })
      await this.Delay(100);
    }
  }

  async redirect(){
    this.message = "Redirecting...";
    this.router.navigate(["/main"]);
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
