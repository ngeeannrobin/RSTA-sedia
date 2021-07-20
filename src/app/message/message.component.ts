import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter();
  @Input() msg: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  Dismiss() {
    this.dismiss.emit();
  }

}
