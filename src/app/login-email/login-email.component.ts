import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {
  @Output() emitter: EventEmitter<any> = new EventEmitter();
  @Input() showForget: Boolean = false;
  constructor() { }

  cred: any = {email: "",password: "", checked: false}
  msg: any = {email: "", password: ""}
  forgetMode: boolean = false;

  ngOnInit(): void {
  }

  confirm() {
    if (!this.forgetMode){
      if (this.Verify()){
        this.cred.checked=true;
        this.emitter.emit(this.cred)
      }
    } else {
      if (this.VerifyEmail(this.cred.email)){
        this.cred.checked = true;
        this.cred.reset=true;
        this.emitter.emit(this.cred);
      }
    }

  }

  cancel() {
    this.emitter.emit({checked: false});
  }

  Verify(){
    this.msg.email = "";
    this.msg.password = "";
    let verified = this.VerifyEmail(this.cred.email)
    verified = this.VerifyPassword(this.cred.password) && verified;
    return verified;
  }

  VerifyEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == ""){
      this.msg.email = "* Please enter email."
      return false
    } else if (!re.test(String(email).toLowerCase())) {
      this.msg.email = "* Invalid email."
      return false;
    }
    return true;
  }

  VerifyPassword(password:string){
    if (password.length<6){
      this.msg.password = "* Password must be at least 6 characters long."
      return false
    }
    return true;
  }

  ForgetPassword(){

    this.forgetMode = true;
    this.msg.email = "Enter email and tap 'Confirm'.";
  }

}
