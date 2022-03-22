import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'new-ma',
  templateUrl: './new-ma.component.html',
  styleUrls: ['./new-ma.component.css']
})
export class NewMaComponent implements OnInit {

  constructor(public admin:AdminService) { }
  @Input() newMA;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() done: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    // Freeze background scrolling
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.position = 'fixed';
  }

  Close() {
    // Unfreeze background scrolling
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  Done() {
    if (this.newMA.r !== "" && this.newMA.l !== "") {
      this.Close();
      this.done.emit();
    }
  }



}
