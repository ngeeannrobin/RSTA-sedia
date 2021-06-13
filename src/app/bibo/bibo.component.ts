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
    this.bibo.Book(this.auth.uid,this.bookingIn,$event)
  }

}
