import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bibo-input-code',
  templateUrl: './bibo-input-code.component.html',
  styleUrls: ['./bibo-input-code.component.css']
})
export class BiboInputCodeComponent implements OnInit {

  constructor() { }
  code: string = "";
  msg: string = "";
  @Output() codeEmitter: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  cancel() {
    this.codeEmitter.emit(null);
  }

  confirm() {
    if (this.code != "") {
      this.codeEmitter.emit(this.code);
    } else {
      this.msg = "Please enter code."
    }
    
  }

}
