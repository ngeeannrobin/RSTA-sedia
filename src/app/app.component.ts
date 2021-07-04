import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private updates: SwUpdate) {
    this.updates.available.subscribe(event => {
      this.doAppUpdate();
    })
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}

