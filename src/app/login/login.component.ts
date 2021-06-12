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
    this.auth.CheckLogin(true);
  }

  async signInWithGoogle(){
    this.auth.CheckLogin().then(loggedIn=>{
      if (!loggedIn){
        this.message = "Google Pop-up opened."
        this.auth.GoogleAuth().then(_ => {
          this.redirect();
        })
      } else {
        this.redirect();
      }
    }) 
  }

  async redirect(){
    this.message = "Redirecting...";
    // this.redirec = true;
    // this.displayProgressSpinner = false;
    await this.Delay(300);
    this.router.navigate(["/bibo"]);
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
