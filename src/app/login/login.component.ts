import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = "I swear this UI is temporary.";
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
