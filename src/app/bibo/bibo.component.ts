import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BiboService } from '../bibo.service';

@Component({
  selector: 'app-bibo',
  templateUrl: './bibo.component.html',
  styleUrls: ['./bibo.component.css']
})
export class BiboComponent implements OnInit {
  scan: Boolean = false;
  bookingIn: Boolean;
  msg: String = "";
  constructor(private auth: AuthService, private bibo: BiboService, private router: Router) { }

  ngOnInit(): void {
    this.auth.Init(true);
  }

  bookIn() {
    this.bookingIn = true;
    this.Scan();
  }
  bookOut() {
    this.bookingIn = false
    this.Scan();
  }

  Scan(){
    this.scan = true;
  }

  qrstring($event: any){
    this.scan = false;
    this.msg = "Loading...";
    this.bibo.Book(this.bookingIn,$event).then(data=>{
      if (data.verified){
        this.msg = `Successfully booked ${this.bookingIn?"in":"out"}.`;
      } else if (data.code == 1) {
        this.msg = `Invalid code. Code may have expired.`
      }
    });
  }

}
