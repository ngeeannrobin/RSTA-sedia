import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @Output() emitter: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    this.emitter.emit($event);
  }


}
