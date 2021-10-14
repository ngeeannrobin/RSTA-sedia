import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'select-plt',
  templateUrl: './select-plt.component.html',
  styleUrls: ['./select-plt.component.css']
})
export class SelectPltComponent implements OnInit {

  constructor() { }
  plt: number;
  bookIn: boolean;
  plts: Array<any> = [["Coy HQ","coyhq.png"],["Platoon 1","plt1.png"],["Platoon 2","plt2.png"],["Platoon 3","plt3.png"]];

  @Output() final: EventEmitter<number> = new EventEmitter();


  ngOnInit(): void {
  }

  SelectPlt(plt){
    this.plt = plt;
  }

  Finalise() {
    this.final.emit(this.plt);
  }
}
