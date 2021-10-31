import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }
  @Input() darkMode: boolean = false;
  ngOnInit(): void {
  }

  back() {
    this.location.back();
    // this.router.navigate([".."]);
  }

}
