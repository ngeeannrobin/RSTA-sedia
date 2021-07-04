import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})
export class ChangeDateComponent implements OnInit {
  @Output() dateEmitter: EventEmitter<any> = new EventEmitter();
  @Input() dateStr:string;
  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    this.dateEmitter.emit({cancel:true});
  }

  confirm(){
    this.dateEmitter.emit({cancel:false, dateStr: this.dateStr});
  }
}
