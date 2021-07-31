import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'change-rank-name',
  templateUrl: './change-rank-name.component.html',
  styleUrls: ['./change-rank-name.component.css']
})
export class ChangeRankNameComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();

  constructor(private auth: AuthService, private prof: ProfileService) { }
  @Input() firstTime:boolean = false;
  @Input() data:any;
  name: string;

  ngOnInit(): void {
    this.name = this.data.name;
  }

  cancel(){
    this.open.emit(false);
  }

  confirm(){
    if (this.name==undefined) {return;}
    this.prof.UpdateProfile(this.auth.uid,this.name).then(_=>{
      this.data.name = this.name.toUpperCase();
      this.cancel();
    })
  }

}
