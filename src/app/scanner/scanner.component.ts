import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @Output() qrstring: EventEmitter<string> = new EventEmitter();
  @Output() errEmitter: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    this.qrstring.emit($event);
  }

  public error($event: any) {
    console.log($event)
  }

  public camNotFound($event) {
    this.errEmitter.emit("No camera found.");
  }


}
